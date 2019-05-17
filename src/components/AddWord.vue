<template>
  <div>
    <v-card class="indigo lighten-2 mt-2" flat>
      <v-card-text>
        <h1 class="text-xs-center">
          Add Words
          <i class="fas fa-pencil-alt"></i>
        </h1>
        <p
          class="text-xs-center mb-0"
        >Here you can translate and add new words to your lists to practice them later</p>
      </v-card-text>
    </v-card>

    <v-container class="amber lighten-2 mt-2" fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout class="amber lighten-2" row wrap>
            <v-flex d-flex xs12>
              <v-card class="amber lighten-2" light tile flat>
                <v-card-text class="text-xs-center">Choose language</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row>
                <v-flex xs6>
                  <v-layout>
                    <v-flex>
                      <v-autocomplete
                        v-model="fromLang"
                        :items="langs"
                        class="mx-1"
                        flat
                        hide-no-data
                        hide-details
                        label="From"
                        solo-inverted
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout>
                    <v-flex>
                      <v-autocomplete
                        v-model="toLang"
                        :items="langs"
                        class="mx-1"
                        flat
                        hide-no-data
                        hide-details
                        label="To"
                        solo-inverted
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex class="mt-1" d-flex>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field v-model="textToTranslate" label="Type here" outline clearable></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-btn @click="translateMe" class="px-2" outline color="indigo">Translate!</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout class="amber lighten-2" align-center justify-center row>
        <v-flex xs5>
          <v-textarea
            v-model="currentWord"
            name="input-7-1"
            label="Your words"
            height="75"
            outline
            readonly
          ></v-textarea>
        </v-flex>
        <v-flex xs2>
          <v-card-text class="text-xs-center">=</v-card-text>
        </v-flex>
        <v-flex xs5>
          <v-textarea v-model="translation" name="input-7-1" label="Word" height="75" outline></v-textarea>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout class="amber lighten-2" row wrap>
            <v-flex d-flex xs12>
              <v-card class="amber lighten-2" tile flat>
                <v-card-text class="text-xs-center">Choose a list where save it:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row justify-space-between>
                <v-flex xs8>
                  <v-layout>
                    <v-flex>
                      <v-autocomplete
                        v-model="list"
                        :items="lists"
                        class="mx-1"
                        flat
                        prefix="List:"
                        solo-inverted
                      ></v-autocomplete>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout>
                    <v-flex>
                      <v-btn @click="addWord" class="px-2" outline color="indigo">Save!</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <!-- <div>
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
  </div>-->
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
      langs: [
        { value: "auto", text: "Automatic" },
        { value: "af", text: "Afrikaans" },
        { value: "sq", text: "Albanian" },
        { value: "am", text: "Amharic" },
        { value: "ar", text: "Arabic" },
        { value: "hy", text: "Armenian" },
        { value: "az", text: "Azerbaijani" },
        { value: "eu", text: "Basque" },
        { value: "be", text: "Belarusian" },
        { value: "bn", text: "Bengali" },
        { value: "bs", text: "Bosnian" },
        { value: "bg", text: "Bulgarian" },
        { value: "ca", text: "Catalan" },
        { value: "ceb", text: "Cebuano" },
        { value: "ny", text: "Chichewa" },
        { value: "zh", text: "Chinese Simplified" },
        { value: "co", text: "Corsican" },
        { value: "hr", text: "Croatian" },
        { value: "cs", text: "Czech" },
        { value: "da", text: "Danish" },
        { value: "nl", text: "Dutch" },
        { value: "en", text: "English" },
        { value: "eo", text: "Esperanto" },
        { value: "et", text: "Estonian" },
        { value: "tl", text: "Filipino" },
        { value: "fi", text: "Finnish" },
        { value: "fr", text: "French" },
        { value: "fy", text: "Frisian" },
        { value: "gl", text: "Galician" },
        { value: "ka", text: "Georgian" },
        { value: "de", text: "German" },
        { value: "el", text: "Greek" },
        { value: "gu", text: "Gujarati" },
        { value: "ht", text: "Haitian Creole" },
        { value: "ha", text: "Hausa" },
        { value: "haw", text: "Hawaiian" },
        { value: "he", text: "Hebrew" },
        { value: "iw", text: "Hebrew" },
        { value: "hi", text: "Hindi" },
        { value: "hmn", text: "Hmong" },
        { value: "hu", text: "Hungarian" },
        { value: "is", text: "Icelandic" },
        { value: "ig", text: "Igbo" },
        { value: "id", text: "Indonesian" },
        { value: "ga", text: "Irish" },
        { value: "it", text: "Italian" },
        { value: "ja", text: "Japanese" },
        { value: "jw", text: "Javanese" },
        { value: "kn", text: "Kannada" },
        { value: "kk", text: "Kazakh" },
        { value: "km", text: "Khmer" },
        { value: "ko", text: "Korean" },
        { value: "ku", text: "Kurdish (Kurmanji)" },
        { value: "ky", text: "Kyrgyz" },
        { value: "lo", text: "Lao" },
        { value: "la", text: "Latin" },
        { value: "lv", text: "Latvian" },
        { value: "lt", text: "Lithuanian" },
        { value: "lb", text: "Luxembourgish" },
        { value: "mk", text: "Macedonian" },
        { value: "mg", text: "Malagasy" },
        { value: "ms", text: "Malay" },
        { value: "ml", text: "Malayalam" },
        { value: "mt", text: "Maltese" },
        { value: "mi", text: "Maori" },
        { value: "mr", text: "Marathi" },
        { value: "mn", text: "Mongolian" },
        { value: "my", text: "Myanmar (Burmese)" },
        { value: "ne", text: "Nepali" },
        { value: "no", text: "Norwegian" },
        { value: "ps", text: "Pashto" },
        { value: "fa", text: "Persian" },
        { value: "pl", text: "Polish" },
        { value: "pt", text: "Portuguese" },
        { value: "pa", text: "Punjabi" },
        { value: "ro", text: "Romanian" },
        { value: "ru", text: "Russian" },
        { value: "sm", text: "Samoan" },
        { value: "gd", text: "Scots Gaelic" },
        { value: "sr", text: "Serbian" },
        { value: "st", text: "Sesotho" },
        { value: "sn", text: "Shona" },
        { value: "sd", text: "Sindhi" },
        { value: "si", text: "Sinhala" },
        { value: "sk", text: "Slovak" },
        { value: "sl", text: "Slovenian" },
        { value: "so", text: "Somali" },
        { value: "es", text: "Spanish" },
        { value: "su", text: "Sundanese" },
        { value: "sw", text: "Swahili" },
        { value: "sv", text: "Swedish" },
        { value: "tg", text: "Tajik" },
        { value: "ta", text: "Tamil" },
        { value: "te", text: "Telugu" },
        { value: "th", text: "Thai" },
        { value: "tr", text: "Turkish" },
        { value: "uk", text: "Ukrainian" },
        { value: "ur", text: "Urdu" },
        { value: "uz", text: "Uzbek" },
        { value: "vi", text: "Vietnamese" },
        { value: "cy", text: "Welsh" },
        { value: "xh", text: "Xhosa" },
        { value: "yi", text: "Yiddish" },
        { value: "yo", text: "Yoruba" },
        { value: "zu", text: "Zulu" }
      ],
      fromLang: null,
      toLang: null,
      userID: "dmolcap@gmail.com",
      textToTranslate: "",
      translation: "",
      currentWord: "",
      list: null
    };
  },
  computed: {
    lists() {
      return this.$store.getters.getLists;
    }
  },
  methods: {
    translateMe() {
      translate(this.textToTranslate, { from: this.fromLang, to: this.toLang })
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
  mounted() {
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
