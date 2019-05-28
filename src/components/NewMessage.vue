<template>
  <div>
    <v-form v-model="valid" ref="form">
      <v-text-field label="Type here..." v-model="newMessage" required></v-text-field>
      <v-layout align-center justify-space-between>
        <v-btn
          @click="sendMessage()"
          :class=" { 'red darken-4 white--text' : valid }"
          :disabled="!valid"
          round
        >Send</v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "NewMessage",
  props: ["lang"],
  data() {
    return {
      userName: null,
      newMessage: null,
      errorText: null,
      valid: true
    };
  },
  computed: {},
  methods: {
    getUserName() {
      this.userName = this.$store.getters.getUserName;
    },
    sendMessage() {
      if (this.newMessage) {
        db.collection(this.lang + "_chat")
          .add({
            name: this.userName,
            message: this.newMessage,
            timestamp: Date.now()
            // timestamp: firebase.firestore.FieldValue.serverTimestamp()
          })
          .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            console.log(firebase.firestore.FieldValue.serverTimestamp());
          })
          .catch(err => console.log(err));

        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A new message must be entered";
      }
    }
  },
  mounted() {
    console.log(this.lang);
  },
  created() {
    this.$store.dispatch("getUserName");
    this.getUserName();
  }
};
</script>

<style scoped>
</style>
