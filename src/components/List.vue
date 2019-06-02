<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" flat>
      <v-card-text>
        <v-list-tile avatar>
          <v-icon class="mr-1">fas fa-list-alt</v-icon>

          <v-list-tile-content>
            <v-list-tile-title class="title font-weight-bold">{{ listName }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <router-link to="/lists">
              <v-btn round dark color="red darken-4">
                <v-icon>fas fa-arrow-circle-left</v-icon>&nbsp;
                Back
              </v-btn>
            </router-link>
          </v-list-tile-action>
        </v-list-tile>
      </v-card-text>
    </v-card>

    <!-- <v-list>
      <v-list-group v-for="(word, i) in words" :key="word" no-action>
        <template v-slot:activator>
          <v-list-tile>
            <v-list-tile-content>
              <v-list-tile-title>{{ word }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>

        <v-list-tile v-for="answer in answers[i]" :key="answer" @click="hola1()">
          <v-list-tile-content>
            <v-list-tile-title>{{ answer }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action @click="hola2()">
            <v-icon>fas fa-info-circle</v-icon>
          </v-list-tile-action>
        </v-list-tile>
      </v-list-group>
    </v-list>-->

    <v-layout row wrap id="color">
      <v-flex xs12 sm6 offset-sm3>
        <v-layout row align-center v-for="(word, i) in words" :key="word">
          <v-flex xs10>
            <v-card flat color="rgb(255, 255, 255, 0)">
              <v-card-text class="subheading font-weight-bold">
                <strong>{{ word }}</strong> =
                <!-- <span v-for="answer in answers[i]" :key="answer">{{ answer+", " }}</span> -->
                <v-chip class="body-2" v-for="answer in answers[i]" :key="answer">
                  {{ answer }}
                  <v-icon
                    small
                    color="grey darken-1"
                    class="ml-1"
                    @click="getWordIndex(i); selectedWord(word); deleteTranslation(answer)"
                  >fas fa-times-circle</v-icon>
                </v-chip>
              </v-card-text>
            </v-card>
          </v-flex>

          <v-flex xs2>
            <v-speed-dial v-model="fab[i]" direction="left" :transition="transition">
              <template v-slot:activator>
                <v-btn
                  v-model="fab[i]"
                  color="red darken-4"
                  dark
                  fab
                  small
                  @click="selectedWord(word)"
                >
                  <v-icon>fas fa-user-circle</v-icon>
                  <v-icon>fas fa-times-circle</v-icon>
                </v-btn>
              </template>

              <!-- Add word dialog -->
              <v-dialog v-model="editDialog">
                <template v-slot:activator="{ on }">
                  <v-btn fab dark small color="green" class="mr-1" v-on="on">
                    <v-icon>fas fa-plus</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title>
                    <span class="headline">Add new meaning</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md4>
                          <p>
                            Type below the new translation for
                            <span
                              class="font-weight-bold"
                            >{{ word }}</span>
                          </p>
                          <v-form v-model="validName" ref="form">
                            <v-text-field
                              label="Type a new meaning"
                              v-model="newTranslation"
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
                      @click="addTranslation(); editDialog = false; getWordIndex(i)"
                    >Add translation</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- Delete word dialog -->
              <v-dialog v-model="deleteDialog" width="500">
                <template v-slot:activator="{ on }">
                  <v-btn fab dark small color="red" class="mr-1" v-on="on">
                    <v-icon>fas fa-trash-alt</v-icon>
                  </v-btn>
                </template>

                <v-card>
                  <v-card-title class="headline grey lighten-2" primary-title>Are you sure?</v-card-title>

                  <!-- <v-card-text>
                    List
                    <span class="font-weight-bold">{{ list }}</span> is going to be deleted. This change is permanent and you can't recover this list in the future
                  </v-card-text>-->

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
                      @click="deleteWord(); deleteDialog = false; getWordIndex(i)"
                    >Yes! I'm sure</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>

              <!-- <v-btn fab dark small color="green" class="mr-1">
                      <v-icon>fas fa-edit</v-icon>
              </v-btn>-->

              <!-- <v-btn fab dark small color="red" class="mr-1">
                      <v-icon>fas fa-trash-alt</v-icon>
              </v-btn>-->
            </v-speed-dial>
          </v-flex>
          <v-divider></v-divider>
        </v-layout>
      </v-flex>
    </v-layout>

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
  name: "List",
  props: ["listName"],
  components: {
    Navbar
  },
  data() {
    return {
      chip: [],
      userID: null,
      words: [],
      answers: null,
      word: null,
      validName: false,
      nameRules: [v => !!v || "A name is required"],
      newTranslation: null,
      editDialog: false,
      deleteDialog: false,
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
  computed: {},
  methods: {
    hola1() {
      console.log("Soy el content");
    },
    getUserID() {
      this.userID = this.$store.getters.getUserID;
    },
    getWords() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.listName)
        .get()
        .then(doc => {
          // Retrieve the keys form the object
          this.words = Object.keys(doc.data());
          // Remove default key 'userID' from the array
          let userIDIndex = this.words.indexOf(this.userID);
          this.words.splice(userIDIndex, 1);
          // Retrieve the values form the object
          this.answers = Object.values(doc.data());
          // Remove default value 'userID' from the array
          this.answers.splice(userIDIndex, 1);
          // this.wordsAndAnswers = Object.entries(doc.data());
          // this.checkAnswer();
          // console.log(this.answers);
        })
        .catch(error => console.log("Error getting document:", error));
    },
    selectedWord(word) {
      this.word = word;
    },
    getWordIndex(i) {
      this.wordIndex = i;
    },
    deleteWord() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.listName)
        .update({
          [this.word]: firebase.firestore.FieldValue.delete()
        })
        .then(() => {
          this.fab[this.wordIndex] = false;
          this.newListMsg = "Word deleted!";
          this.color = "success";
          this.snackbar = true;
          this.getWords();
          this.$forceUpdate();
        });
    },
    deleteTranslation(translation) {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.listName)
        .update({
          [this.word]: this.answers[this.wordIndex].filter(
            answer => answer !== translation
          )
        })
        .then(() => {
          this.newListMsg = "Translation deleted!";
          this.color = "success";
          this.snackbar = true;
          this.getWords();
          this.$forceUpdate();
        });
    },
    addTranslation() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.listName)
        .update({
          [this.word]: firebase.firestore.FieldValue.arrayUnion(
            this.newTranslation
          )
        })
        .then(() => {
          this.newTranslation = null;
          this.fab[this.wordIndex] = false;
          this.newListMsg = "Translation added!";
          this.color = "success";
          this.snackbar = true;
          this.getWords();
          this.$forceUpdate();
        })
        .catch(error => console.error("Error adding words: ", error));
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getUserID");
    this.getUserID();
    this.getWords();
  }
};
</script>

<style scoped>
#color {
  background-color: rgb(255, 255, 255, 0.5);
}

#listTileTitle {
  white-space: normal;
  height: auto;
  line-height: 0px;
}

#listTileContent {
  height: auto;
}
</style>
