<template>
  <v-app class="indigo lighten-2" id="back">
    <Navbar :key="$route.fullPath"/>

    <v-layout id="logo" class="pt-5" row>
      <v-flex xs12 class="text-xs-center">
        <img alt="logo" src="./assets/wordsfit_title70.png">
      </v-flex>
    </v-layout>

    <v-content class="pt-0">
      <router-view/>
    </v-content>

    <v-footer color="rgb(255, 0, 0, 0)" class="pa-3">
      <v-spacer></v-spacer>
      <p class="ma-0">
        &copy; {{ new Date().getFullYear() }} | Made with
        <v-icon color="red" small>fas fa-heart</v-icon>
        <span></span> by
        <a href="https://github.com/Molina-Daniel" target="_blank" rel="github">Daniel Molina</a>
      </p>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import firebase from "firebase";
import Navbar from "@/components/Navbar.vue";

export default {
  name: "App",
  components: {
    Navbar
  },
  data() {
    return {
      src: "./assets/wordsfit_logo.png"
    };
  },
  methods: {},
  created() {}
};
</script>

<style>
/* color="rgb(255, 0, 0, 0)" */

#back {
  /* width: 100wh; */
  /* height: 90vh; */
  color: #fff;
  background: linear-gradient(-45deg, #fff886, #f072b6, #23bad5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 10s ease infinite;
  -moz-animation: Gradient 10s ease infinite;
  animation: Gradient 10s ease infinite;
}
/* #ee7752, #e73c7e, #23a6d5, #23d5ab */

@-webkit-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@-moz-keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes Gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

#logo {
  max-height: 135px;
  /* overflow-y: auto; */
}

a {
  text-decoration: none;
}
</style>
