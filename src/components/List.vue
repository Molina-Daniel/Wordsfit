<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" flat>
      <v-card-text>
        <!-- English Chat header -->
        <v-list-tile avatar>
          <!-- <v-list-tile-avatar>
            <img alt="england flag" src="../assets/united_kingdom_flag.png">
          </v-list-tile-avatar>-->

          <v-list-tile-content>
            <v-list-tile-title class="title font-weight-bold">{{ listName }}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <router-link to="/lists">
              <v-btn round dark color="red darken-4">
                <v-icon>fas fa-arrow-circle-left</v-icon>&nbsp;
                Back
              </v-btn>
            </router-link>
          </v-list-tile-action>
        </v-list-tile>
      </v-card-text>
    </v-card>

    <!-- <v-layout row>
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

          <v-card-text>
            <NewMessage :lang="lang"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>-->
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "List",
  props: ["listName"],
  components: {
    Navbar
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style scoped>
</style>
