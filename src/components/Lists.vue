<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" flat>
      <v-card-text>
        <h1 class="text-xs-center">
          Lists
          <i class="fas fa-clipboard-list"></i>
        </h1>
        <p class="text-xs-center ma-0">Here you can check, create and modify your lists.</p>
      </v-card-text>
    </v-card>

    <v-container color="rgb(255, 255, 255, 0.7)" fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 255, 255, 0.3)" tile flat>
                <v-card-text class="text-xs-center title">Create a new list:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex>
              <v-layout row align-center>
                <v-flex xs8>
                  <v-text-field
                    v-model="newListName"
                    label="Type a name"
                    class="mt-1"
                    hide-details
                    outline
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-btn @click="newList" dark round color="red darken-4">Create!</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <!-- Lists -->
      <v-layout row class="mt-2">
        <v-flex xs12 sm6 offset-sm3>
          <v-card color="rgb(255, 255, 255, 0.5)">
            <v-list class="transparent" subheader v-for="(list, i) in lists" :key="list">
              <v-list-tile avatar>
                <router-link :to="{ name: 'List', params: { listName: list }}">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ list }}</v-list-tile-title>
                  </v-list-tile-content>
                </router-link>

                <v-spacer></v-spacer>

                <v-list-tile-action>
                  <v-speed-dial v-model="fab[i]" direction="left" :transition="transition">
                    <template v-slot:activator>
                      <v-btn
                        v-model="fab[i]"
                        color="red darken-4"
                        dark
                        fab
                        small
                        @click="selectedList(list)"
                      >
                        <v-icon>fas fa-user-circle</v-icon>
                        <v-icon>fas fa-times-circle</v-icon>
                      </v-btn>
                    </template>

                    <!-- Edit name dialog -->
                    <v-dialog v-model="editDialog">
                      <template v-slot:activator="{ on }">
                        <v-btn fab dark small color="green" class="mr-1" v-on="on">
                          <v-icon>fas fa-edit</v-icon>
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title>
                          <span class="headline">List name change</span>
                        </v-card-title>

                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm6 md4>
                                <p>
                                  Type below the new name for
                                  <span
                                    class="font-weight-bold"
                                  >{{ list }}</span> list
                                </p>
                                <v-form v-model="validName" ref="form">
                                  <v-text-field
                                    label="Type a new name"
                                    v-model="listNameChanged"
                                    :rules="nameRules"
                                    required
                                  ></v-text-field>
                                </v-form>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn dark round color="red darken-4" @click="editDialog = false">Cancel</v-btn>
                          <v-btn
                            :class=" { 'red darken-4 white--text' : validName }"
                            :disabled="!validName"
                            round
                            @click="changeListName(); editDialog = false"
                          >Change name</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>

                    <!-- Delete list dialog -->
                    <v-dialog v-model="deleteDialog" width="500">
                      <template v-slot:activator="{ on }">
                        <v-btn fab dark small color="red" class="mr-1" v-on="on">
                          <v-icon>fas fa-trash-alt</v-icon>
                        </v-btn>
                      </template>

                      <v-card>
                        <v-card-title class="headline grey lighten-2" primary-title>Are you sure?</v-card-title>

                        <v-card-text>
                          List
                          <span class="font-weight-bold">{{ list }}</span> is going to be deleted. This change is permanent and you can't recover this list in the future
                        </v-card-text>

                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            dark
                            round
                            color="red darken-4"
                            @click="deleteDialog = false"
                          >No! I'm sorry</v-btn>
                          <v-btn
                            dark
                            round
                            color="red darken-4"
                            @click="deleteList(); deleteDialog = false"
                          >Yes! I'm sure</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-speed-dial>
                </v-list-tile-action>
              </v-list-tile>

              <v-divider></v-divider>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar
      class="mt-5 title"
      v-model="snackbar"
      :color="color"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      <v-icon v-if="color === 'success'">fas fa-check-circle</v-icon>
      <v-icon v-else>fas fa-times-circle</v-icon>
      {{ newListMsg }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "Lists",
  components: {
    Navbar
  },
  data() {
    return {
      editDialog: false,
      deleteDialog: false,
      nameRules: [v => !!v || "A name is required"],
      validName: false,
      userID: null,
      list: null,
      words: [],
      answers: null,
      newListName: null,
      listNameChanged: null,
      fab: [],
      transition: "slide-y-reverse-transition",
      snackbar: false,
      y: "top",
      x: null,
      mode: "multi-line",
      timeout: 2000,
      newListMsg: null,
      color: null
    };
  },
  computed: {
    lists() {
      return this.$store.getters.getLists;
    }
  },
  methods: {
    // getAllLists() {
    //   // Get ALL documents from a collection
    //   db.collection("users")
    //     .doc(this.userID)
    //     .collection("lists")
    //     // .doc(this.list)
    //     .get()
    //     .then(querySnapshot => {
    //       querySnapshot.forEach(doc => {
    //         console.log(doc.id);
    //         if (doc.id != "general") {
    //           this.listNames.push(doc.id);
    //         }
    //       });
    //     })
    //     .catch(error => console.log("Error getting document:", error));
    // },
    getUserID() {
      this.userID = this.$store.getters.getUserID;
    },
    newList() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.newListName)
        .set({
          [this.userID]: this.userID
        })
        .then(() => {
          this.newListMsg = "New list created!";
          this.color = "success";
          this.snackbar = true;
          this.newListName = "";
          this.$store.dispatch("getAllLists");
        })
        .catch(error => console.error("Error merging: ", error));
    },
    selectedList(list) {
      this.list = list;
    },
    changeListName() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.list)
        .get()
        .then(doc => {
          console.log(doc.id);
          if (doc && doc.exists) {
            let data = doc.data();
            // Save the data to the new doc name
            db.collection("users")
              .doc(this.userID)
              .collection("lists")
              .doc(this.listNameChanged)
              .set(data)
              .then(() => {
                db.collection("users")
                  .doc(this.userID)
                  .collection("lists")
                  .doc(this.list)
                  .delete();
                this.$store.dispatch("getAllLists");
                this.listNameChanged = null;
              })
              .catch(err =>
                console.log(
                  "Couldn't delelete the document in the database, error: " +
                    err
                )
              );
          }
          this.$store.dispatch("getAllLists");
          this.fab = [];
        })
        .catch(error => console.log("Error changing document name:", error));
      this.$store.dispatch("getAllLists");
    },
    deleteList() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.list)
        .delete()
        .then(() => {
          this.newListMsg = "List deleted!";
          this.color = "success";
          this.snackbar = true;
          this.newListName = "";
          this.$store.dispatch("getAllLists");
        });
    }
  },
  mounted() {
    // this.$store.dispatch("getAllLists");
  },
  created() {
    this.$store.dispatch("getUserID");
    this.$store.dispatch("getAllLists");
    this.getUserID();
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
.v-card__text {
  padding: 8px;
  width: 100%;
}
</style>
