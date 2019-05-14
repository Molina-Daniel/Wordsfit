<template>
  <div>
    <div>
      <NavigationBar/>
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
      <button>Check!</button>
    </div>

    <div>
      <button class="mt">Next one..</button>
    </div>

    <div>
      <h2>{{ result }}</h2>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/views/NavigationBar.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "Workout",
  components: {
    NavigationBar
  },
  data() {
    return {
      userID: "dmolcap@gmail.com",
      list: "general",
      word: null,
      answer: null,
      result: null,
      words: null,
      wordsAndAnswers: null
    };
  },
  computed: {
    askRandomWord() {
      return (this.word = this.words[
        Math.floor(Math.random() * this.words.length)
      ]);
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
          // askRandomWord();
          console.log(this.words);
          console.log(this.wordsAndAnswers);
          console.log(this.wordsAndAnswers[0][1]);
        })
        .catch(error => console.log("Error getting document:", error));
    }

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
  },
  created() {
    // Get ONE document from a collection
    this.getlist();
  }
};

// .then(doc => console.log(doc._document.proto.fields))
</script>

<style>
#answer {
  margin-left: 10px;
  margin-top: 30px;
}

#listSelect {
  margin-left: 10px;
}

button {
  margin-left: 10px;
}

.mt {
  margin-top: 20px;
}
</style>

