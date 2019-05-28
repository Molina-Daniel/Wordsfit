<template>
  <div>
    <v-text-field label="Type here..." v-model="newMessage" required></v-text-field>
    <v-btn
      @click="sendMessage()"
      :class=" { 'red darken-4 white--text' : valid }"
      :disabled="!valid"
      round
    >Send</v-btn>
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
          })
          .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
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
