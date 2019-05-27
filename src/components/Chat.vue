<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" class="mt-2" flat>
      <v-card-text>
        <h1 class="text-xs-center">
          Chat Rooms
          <i class="fas fa-comments"></i>
        </h1>
        <p class="text-xs-center mb-0">Join the Chat with the language you want practice</p>
      </v-card-text>
    </v-card>

    <v-container fluid grid-list-sm>
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <v-card color="rgb(255, 255, 255, 0.5)">
            <v-list class="transparent" two-line subheader>
              <v-list-tile avatar @click>
                <v-list-tile-avatar>
                  <img alt="england flag" src="..\assets\united_kingdom_flag.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>English</v-list-tile-title>
                  <v-list-tile-sub-title>This is the English Chat Room</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon>fas fa-info-circle</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-divider color="black"></v-divider>

              <v-list-tile avatar @click>
                <v-list-tile-avatar>
                  <img alt="spain flag" src="..\assets\spain_flag.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>Spanish</v-list-tile-title>
                  <v-list-tile-sub-title>This is the Spanish Chat Room</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon>fas fa-info-circle</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-divider color="black"></v-divider>

              <v-list-tile avatar @click>
                <v-list-tile-avatar>
                  <img alt="france flag" src="..\assets\france_flag.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>French</v-list-tile-title>
                  <v-list-tile-sub-title>This is the French Chat Room</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon>fas fa-info-circle</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>

              <v-divider color="black"></v-divider>

              <v-list-tile avatar @click>
                <v-list-tile-avatar>
                  <img alt="germany flag" src="..\assets\germany_flag.png">
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>German</v-list-tile-title>
                  <v-list-tile-sub-title>This is the German Chat Room</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon>fas fa-info-circle</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
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
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style>
</style>
