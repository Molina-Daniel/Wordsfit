<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="mt-2" color="rgb(255, 255, 255, 0.7)">
        <div v-if="messages.length < 1">No messages yet!</div>
        <v-card-text class="messages" v-chat-scroll="{always: false, smooth: true}">
          <div v-for="message in messages" :key="message.id">
            <span class="font-weight-black">[{{ message.name }}]:</span>
            <span>{{ " "+ message.message }}</span>
            <span id="timestamp">{{ message.timestamp }}</span>
          </div>
        </v-card-text>

        <v-card-actions>
          <NewMessage :lang="lang"/>
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
      messages: []
    };
  },
  computed: {},
  methods: {
    timeConverter(timestamp) {
      var a = new Date(timestamp);
      var months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ];
      var year = a.getFullYear();
      var month = months[a.getMonth()];
      var date = a.getDate();
      var hour = a.getHours();
      var min = a.getMinutes();
      var sec = a.getSeconds();
      var time = date + " " + month + " " + year + " " + hour + ":" + min;
      return time;
    },
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
                timestamp: this.timeConverter(doc.data().timestamp)
              });
            }
          });
        });
    }
  },
  mounted() {
    console.log(this.lang);
  },
  created() {
    this.getMessages();
  }
};
</script>

<style scoped>
/* #chatbox {
  height: 300px;
  width: 400px;
  overflow-y: scroll;
} */

.messages {
  max-height: 350px;
  overflow: auto;
}

.messages span {
  font-size: 1.2em;
}

#timestamp {
  display: block;
  font-size: 0.7em;
}
</style>
