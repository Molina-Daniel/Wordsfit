<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" class="mt-2" flat>
      <v-card-text>
        <h1 class="text-xs-center">
          Workout
          <i class="fas fa-dumbbell"></i>
        </h1>
        <p class="text-xs-center ma-0">Here you can train with vocabulary from your lists</p>
      </v-card-text>
    </v-card>

    <v-container color="rgb(255, 0, 0, 0)" fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 255, 255, 0.3)" tile flat>
                <v-card-text class="text-xs-center title">Choose a list to Workout:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row justify-space-between>
                <v-flex xs8>
                  <v-layout>
                    <v-flex>
                      <v-card color="rgb(255, 0, 0, 0)" tile flat>
                        <v-card-text class="subheading font-weight-bold">Lists:</v-card-text>
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
                      <v-btn @click="getlist" round dark color="red darken-4
">Train!</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout class="mt-3" align-center justify-center row>
        <v-flex xs5>
          <v-textarea
            v-model="word"
            name="input-7-1"
            label="Word"
            class="font-weight-bold"
            height="75"
            outline
            readonly
          ></v-textarea>
        </v-flex>
        <v-flex xs2>
          <v-card flat color="rgb(255, 0, 0, 0)" class="text-xs-center display-2 mb-4">=</v-card>
        </v-flex>
        <v-flex xs5>
          <v-textarea
            v-model="answer"
            name="input-7-1"
            label="Translation"
            class="font-weight-bold"
            height="75"
            outline
            hint="Introduce any translation saved"
          ></v-textarea>
        </v-flex>
      </v-layout>

      <!-- <v-layout align-center justify-center row>
        <v-flex xs5>
          <v-card tile flat>
            <v-card-text class="text-xs-center">{{ word }}</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs2>
          <v-card-text class="text-xs-center">=</v-card-text>
        </v-flex>
        <v-flex xs5>
          <v-text-field
            hint="You can change the translation"
            persistent-hint
            v-model="answer"
            label="Translation"
            outline
            clearable
          ></v-text-field>
        </v-flex>
      </v-layout>-->

      <v-layout class="text-xs-center" row>
        <v-flex>
          <v-btn @click="checkAnswer" class="px-2" round dark color="red darken-4">Check!</v-btn>
        </v-flex>
        <v-flex>
          <v-btn @click="askRandomWord" class="px-2" round dark color="red darken-4">Start / Next!</v-btn>
        </v-flex>
      </v-layout>

      <v-card v-if="result">
        <v-card-text>
          <h1 class="text-xs-center">{{ result }}</h1>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
  <!-- <div>
      <Navbar/>
    </div>
    <div>
      <h5>Here you can train with vocabulary from your lists</h5>
    </div>

    <div>
      <p>Choose the list to Workout:</p>
      <label for="listSelect">List:</label>
      <select v-model="list" name="listSelect" id="listSelect">
        <option value="general">General</option>
      </select>
      <button @click="getlist">Train!</button>
    </div>

    <div>
      <label for="answer">{{ word }} =</label>
      <input type="text" name="answer" id="answer" v-model="answer">
      <button @click="checkAnswer">Check!</button>
    </div>

    <div>
      <button class="mt" @click="askRandomWord">Start / Next One</button>
    </div>

    <div>
      <h2>{{ result }}</h2>
  </div>-->
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "Workout",
  components: {
    Navbar
  },
  data() {
    return {
      userID: "dmolcap@gmail.com",
      list: "general",
      word: null,
      answer: null,
      result: null,
      words: null,
      wordsAndAnswers: null,
      index: null,
      answers: null
    };
  },
  computed: {
    lists() {
      return this.$store.getters.getLists;
    }
  },
  methods: {
    // Get ONE document from a collection
    getlist() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.list)
        .get()
        .then(doc => {
          // Retrieve the keys form the object
          this.words = Object.keys(doc.data());
          // this.answers = Object.values(doc.data());
          this.wordsAndAnswers = Object.entries(doc.data());
          // this.checkAnswer();
          console.log(this.words);
          console.log(this.wordsAndAnswers);
          console.log(this.wordsAndAnswers[0][1]);
        })
        .catch(error => console.log("Error getting document:", error));
    },
    askRandomWord() {
      this.word = this.words[Math.floor(Math.random() * this.words.length)];
      this.result = null;
      this.answer = null;
    },
    getAnswers() {
      this.wordsAndAnswers.forEach(element => {
        if (element[0] == this.word) {
          this.answers = element[1];
        }
      });
    },
    checkAnswer() {
      this.getAnswers();
      if (this.answers.includes(this.answer.toLowerCase())) {
        this.result = "CORRECT!!";
      } else {
        this.result = "FAIL!! TRY AGAIN";
      }
    }
  },
  created() {
    this.getlist();
    this.$store.dispatch("getAllLists");
  }
};

// Get ALL documents from a collection
// getlist() {
//   let docRef = db
//     .collection("users")
//     .doc(this.userID)
//     .collection("lists")
//     // .doc(this.list)
//     .get()
//     .then(querySnapshot => {
//       querySnapshot.forEach(doc => {
//         // doc.data() is never undefined for query doc snapshots
//         console.log(doc.data());
//       });
//     })
//     .catch(error => console.log("Error getting document:", error));
// },
</script>

<style>
.v-card__text {
  padding: 8px;
  width: 100%;
}
</style>

