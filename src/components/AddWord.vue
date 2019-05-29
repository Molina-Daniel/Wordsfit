<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" class="mt-2" flat>
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

    <v-container fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 255, 255, 0.3)" tile flat>
                <v-card-text class="text-xs-center title">Choose language</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row>
                <v-flex xs6>
                  <v-layout>
                    <v-flex>
                      <v-select
                        v-model="fromLang"
                        :items="langs"
                        label="From"
                        class="font-weight-bold mt-1"
                        hide-details
                        outline
                        :menu-props="{ auto: true }"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout>
                    <v-flex>
                      <v-select
                        v-model="toLang"
                        :items="langs"
                        label="To"
                        class="font-weight-bold mt-1"
                        hide-details
                        outline
                        :menu-props="{ auto: true }"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>

            <v-flex class="mt-1" d-flex>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field
                    v-model="textToTranslate"
                    label="Type here"
                    outline
                    hide-details
                    single-line
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-btn
                    @click="translateMe()"
                    class="px-2"
                    round
                    dark
                    color="red darken-4"
                  >Translate</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout align-center justify-center row>
        <v-flex xs5>
          <v-textarea
            v-model="currentWord"
            name="input-7-1"
            label="You typed"
            class="font-weight-bold mt-2"
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
            v-model="translation"
            name="input-7-1"
            label="Translation"
            class="font-weight-bold mt-2"
            height="75"
            outline
          ></v-textarea>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 255, 255, 0.3)" tile flat>
                <v-card-text class="text-xs-center title">Choose a list where save it:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row justify-space-between>
                <v-flex xs8>
                  <v-layout>
                    <v-flex>
                      <v-select
                        v-model="list"
                        :items="lists"
                        label="Lists"
                        class="font-weight-bold mt-1"
                        hide-details
                        outline
                        single-line
                        :menu-props="{ auto: true }"
                      ></v-select>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs4>
                  <v-layout>
                    <v-flex>
                      <v-btn @click="addWord" class="px-2" round dark color="red darken-4">Save!</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
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
      userEmail: null,
      textToTranslate: "",
      translation: "",
      currentWord: "",
      list: null,
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
    getUserEmail() {
      this.userEmail = this.$store.getters.getUserEmail;
    },
    translateMe() {
      translate(this.textToTranslate, { from: this.fromLang, to: this.toLang })
        .then(res => {
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
        .doc(this.userEmail)
        .collection("lists")
        .doc(this.list)
        .update({
          [this.currentWord]: firebase.firestore.FieldValue.arrayUnion(
            this.translation
          )
        })
        .then(() => {
          this.newListMsg = "Successfully added!";
          this.color = "success";
          this.snackbar = true;
        })
        .catch(error => console.error("Error adding words: ", error));
    }
  },
  // mounted() {
  //   this.$store.dispatch("getAllLists");
  // },
  created() {
    this.$store.dispatch("getUserEmail");
    this.$store.dispatch("getAllLists");
    this.getUserEmail();
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
