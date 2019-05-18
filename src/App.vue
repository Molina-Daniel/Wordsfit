<template>
  <v-app class="indigo lighten-2" id="back">
    <v-toolbar color="rgb(255, 0, 0, 0)" class="ma-0 pa-0" height row flat app>
      <v-btn class="ma-0 pa-0" flat>
        <v-icon left>fas fa-bars</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-title class="header"></v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/home">
        <v-btn flat>
          <v-icon right>fas fa-home</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>

    <img class="pt-5" alt="logo" src="./assets/wordsfit_logo80.png">

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
export default {
  name: "App",
  data() {
    return {
      src: "./assets/wordsfit_logo.png"
    };
  }
};
</script>

<style>
/* color="rgb(255, 0, 0, 0)" */

#back {
  /* width: 100wh; */
  /* height: 90vh; */
  color: #fff;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  -webkit-animation: Gradient 15s ease infinite;
  -moz-animation: Gradient 15s ease infinite;
  animation: Gradient 15s ease infinite;
}

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
</style>
