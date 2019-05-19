<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" flat>
      <v-card-text>
        <h1 class="text-xs-center">
          Lists
          <i class="fas fa-clipboard-list"></i>
        </h1>
        <p class="text-xs-center ma-0">Here you can train with vocabulary from your lists</p>
      </v-card-text>
    </v-card>

    <v-container color="rgb(255, 0, 0, 0)" fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 0, 0, 0)" tile flat>
                <v-card-text class="text-xs-center">Choose a list to Workout:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row justify-space-between>
                <v-flex xs8>
                  <v-layout>
                    <v-flex>
                      <v-card color="rgb(255, 0, 0, 0)" tile flat>
                        <v-card-text>Lists:</v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-autocomplete
                        v-model="list"
                        :items="lists"
                        class="mx-1"
                        flat
                        hide-no-data
                        hide-details
                        label="Lists"
                        solo-inverted
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout>
                    <v-flex>
                      <v-btn
                        @click="getList"
                        class="px-2"
                        dark
                        round
                        color="red darken-4"
                      >Show list!</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 0, 0, 0)" tile flat>
                <v-card-text class="text-xs-center">Or create a new one:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row justify-space-between>
                <v-flex xs8>
                  <v-layout>
                    <v-flex>
                      <v-card color="rgb(255, 0, 0, 0)" tile flat>
                        <v-card-text>Name:</v-card-text>
                      </v-card>
                    </v-flex>
                    <v-flex>
                      <v-text-field v-model="newListName" label="Type here" outline clearable></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout>
                    <v-flex>
                      <v-btn @click="newList" dark round color="red darken-4">Create!</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-card color="rgb(255, 255, 255, 0.7)">
        <v-card-text>
          <p v-for="(word, i) in words" :key="word">
            <strong>{{ word }}</strong> =
            <span v-for="answer in answers[i]" :key="answer">{{ answer+", " }}</span>
          </p>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
  <!-- <div>
      <Navbar/>
    </div>
    <div>
      <h5>Here you can check your lists, create new ones and modify them.</h5>
    </div>

    <div>
      <p>Choose a list:</p>
      <label for="saveInList">List:</label>
      <select v-model="list" name="saveInList" id="listSelect">
        <option value="general">General</option>
        <option v-for="list in listNames" :value="list" :key="list">{{ list | capitalize }}</option>
      </select>
      <button @click="getList">Show list</button>
    </div>

    <div class="mt">
      <p>Or create a new one:</p>
      <label for="newList">Name:</label>
      <input v-model="newListName" type="text" name="newList" id="newList">
      <button @click="newList">Create!</button>
    </div>

    <div>
      <p v-for="word in words" :key="word">{{ word }}</p>
  </div>-->
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "Lists",
  components: {
    Navbar
  },
  data() {
    return {
      userID: "dmolcap@gmail.com",
      list: "general",
      words: null,
      answers: null,
      newListName: null
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
    getList() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.list)
        .get()
        .then(doc => {
          // Retrieve the keys form the object
          this.words = Object.keys(doc.data());
          this.answers = Object.values(doc.data());
          // this.wordsAndAnswers = Object.entries(doc.data());
          // this.checkAnswer();
          console.log(this.answers);
        })
        .catch(error => console.log("Error getting document:", error));
    },
    newList() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.newListName)
        .set({
          exist: true
        })
        .then(() => {
          this.newListName = "";
          console.log("New list created!");
        })
        .catch(error => console.error("Error merging: ", error));
    }
  },
  mounted() {
    // this.getAllLists();
    this.getList();
    this.$store.dispatch("getAllLists");
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
