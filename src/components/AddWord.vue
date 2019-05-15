<template>
  <div>
    <div>
      <Navbar/>
    </div>
    <div>
      <h5>Here you can translate and add new words to your lists to practice them later</h5>
    </div>
    <div class="margintop">
      <form @submit.prevent="translateMe" action="get">
        <input
          v-model="textToTranslate"
          type="text"
          name="textToTranslate"
          id="textToTranslate"
          placeholder="Type a word to translate..."
        >
        <button type="submit" name="textToTranslate" id="translate">Translate!</button>
      </form>
    </div>

    <div>
      <p>
        <label for="translation">{{ currentWord }} =</label>
        <input v-model="translation" type="text" name="translation" id="translation">
      </p>
    </div>

    <div>
      <p>Choose where to save this:</p>
      <label for="saveInList">List:</label>
      <select v-model="list" name="saveInList" id="listSelect">
        <option value="general">General</option>
      </select>
      <button @click="addWord">Save!</button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";
import translate, { setCORS } from "google-translate-api-browser";
setCORS("https://cors-anywhere.herokuapp.com/");
// import { setCORS } from "google-translate-api-browser";
// setting up cors-anywhere server address
// const translate = setCORS("http://cors-anywhere.herokuapp.com/");

export default {
  name: "AddWord",
  components: {
    Navbar
  },
  data() {
    return {
      userID: "dmolcap@gmail.com",
      textToTranslate: "",
      translation: "",
      currentWord: "",
      list: "general"
    };
  },
  computed: {},
  methods: {
    translateMe() {
      translate(this.textToTranslate, { from: "en", to: "es" })
        .then(res => {
          // I do not eat six days
          console.log(res.text);
          this.translation = res.text.toLowerCase();
          this.getCurrentWord();
          this.textToTranslate = "";
        })
        .catch(err => {
          console.error(err);
        });
    },
    getCurrentWord() {
      this.currentWord = this.textToTranslate.toLowerCase();
    },
    addWord() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.list)
        .update({
          [this.currentWord]: firebase.firestore.FieldValue.arrayUnion(
            this.translation
          )
        })
        .then(() => console.log("Merge done!"))
        .catch(error => console.error("Error merging: ", error));
    }
  },
  mounted() {}
};
</script>

<style scoped>
#translation,
#listSelect {
  margin-left: 10px;
  border: none;
}

button {
  margin-left: 10px;
}
</style>
