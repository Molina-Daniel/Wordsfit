<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card class="mt-2" color="rgb(255, 255, 255, 0.7)">
        <v-card-text>
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
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "Chat",
  components: {
    Navbar
  },
  data() {
    return {
      messages: []
    };
  },
  computed: {},
  methods: {},
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
