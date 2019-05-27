<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="mt-2" color="rgb(255, 255, 255, 0.7)">
        <v-card-text v-chat-scroll="{always: false, smooth:true, }">
          <div v-if="messages.length < 1">No messages yet!</div>
          <div v-for="message in messages" :key="message.id">
            <span>[{{ message.name }}]:</span>
            <span>{{ " "+ message.message }}</span>
            <span>{{ message.timestamp }}</span>
          </div>
        </v-card-text>

        <v-card-actions>
          <NewMessage :name="name"/>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import NewMessage from "@/components/NewMessage.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "Chat",
  props: ["lang"],
  components: {
    Navbar,
    NewMessage
  },
  data() {
    return {
      lang: null,
      messages: []
    };
  },
  computed: {},
  methods: {
    getMessages() {
      db.collection(this.lang + "_chat")
        .orderBy("timestamp")
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            if (change.type == "added") {
              let doc = change.doc;
              this.messages.push({
                id: doc.id,
                name: doc.data().name,
                message: doc.data().message,
                timestamp: doc.data().timestamp.toDate()
              });
            }
          });
        });
    }
  },
  mounted() {},
  created() {}
};
</script>

<style scoped>
/* #chatbox {
  height: 300px;
  width: 400px;
  overflow-y: scroll;
} */
</style>
