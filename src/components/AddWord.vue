<template>
  <div>
    <div>
      <NavigationBar/>
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
      <select name="saveInList" id="listSelect">
        <option value="general">General</option>
      </select>
      <button>Save!</button>
    </div>
  </div>
</template>

<script>
import NavigationBar from "@/views/NavigationBar.vue";
import translate, { setCORS } from "google-translate-api-browser";
setCORS("https://cors-anywhere.herokuapp.com/");
// import { setCORS } from "google-translate-api-browser";
// setting up cors-anywhere server address
// const translate = setCORS("http://cors-anywhere.herokuapp.com/");

export default {
  name: "AddWord",
  components: {
    NavigationBar
  },
  data() {
    return {
      textToTranslate: "",
      translation: "",
      currentWord: ""
    };
  },
  computed: {
    // getCurrentWord() {
    //   return (this.currentWord = this.textToTranslate);
    // }
  },
  methods: {
    translateMe() {
      translate(this.textToTranslate, { to: "es" })
        .then(res => {
          // I do not eat six days
          console.log(res.text);
          this.translation = res.text;
          this.getCurrentWord();
          this.textToTranslate = "";
        })
        .catch(err => {
          console.error(err);
        });
    },
    getCurrentWord() {
      this.currentWord = this.textToTranslate;
    }
  },
  mounted() {}
};
</script>

<style scoped>
</style>
