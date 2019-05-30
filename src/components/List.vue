<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" flat>
      <v-card-text>
        <!-- English Chat header -->
        <v-list-tile avatar v-if="lang == 'en'">
          <v-list-tile-avatar>
            <img alt="england flag" src="../assets/united_kingdom_flag.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>English Chat</v-list-tile-title>
            <v-list-tile-sub-title>Please write in English</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <router-link to="/chatrooms">
              <v-btn round dark color="red darken-4">
                <v-icon>fas fa-arrow-circle-left</v-icon>&nbsp;
                Back
              </v-btn>
            </router-link>
          </v-list-tile-action>
        </v-list-tile>

        <!-- Spanish Chat header -->
        <v-list-tile avatar v-if="lang == 'es'">
          <v-list-tile-avatar>
            <img alt="spain flag" src="../assets/spain_flag.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Spanish Chat</v-list-tile-title>
            <v-list-tile-sub-title>Por favor, escriba en Español</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <router-link to="/chatrooms">
              <v-btn round dark color="red darken-4">
                <v-icon>fas fa-arrow-circle-left</v-icon>&nbsp;
                Back
              </v-btn>
            </router-link>
          </v-list-tile-action>
        </v-list-tile>

        <!-- French Chat header -->
        <v-list-tile avatar v-if="lang == 'fr'">
          <v-list-tile-avatar>
            <img alt="france flag" src="../assets/france_flag.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>French Chat</v-list-tile-title>
            <v-list-tile-sub-title>S'il vous plaît, écrivez en français</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <router-link to="/chatrooms">
              <v-btn round dark color="red darken-4">
                <v-icon>fas fa-arrow-circle-left</v-icon>&nbsp;
                Back
              </v-btn>
            </router-link>
          </v-list-tile-action>
        </v-list-tile>

        <!-- German Chat header -->
        <v-list-tile avatar v-if="lang == 'de'">
          <v-list-tile-avatar>
            <img alt="germany flag" src="../assets/germany_flag.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>German Chat</v-list-tile-title>
            <v-list-tile-sub-title>Bitte auf Deutsch schreiben</v-list-tile-sub-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <router-link to="/chatrooms">
              <v-btn round dark color="red darken-4">
                <v-icon>fas fa-arrow-circle-left</v-icon>&nbsp;
                Back
              </v-btn>
            </router-link>
          </v-list-tile-action>
        </v-list-tile>
      </v-card-text>
    </v-card>

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

          <v-card-text>
            <NewMessage :lang="lang"/>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
    return {
      
    };
  },
  computed: {},
  methods: {},
  mounted() {
    console.log(this.lang);
  },
  created() {
    this.getMessages();
  }
};
</script>

<style scoped>
</style>
