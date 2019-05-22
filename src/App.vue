<template>
  <v-app class="indigo lighten-2" id="back">
    <v-toolbar :color="toolbarColor" class="ma-0 pa-0" row flat app>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <!-- <v-btn class="ma-0 pa-0" flat>
        <v-icon left>fas fa-bars</v-icon>
      </v-btn>-->
      <v-spacer></v-spacer>
      <v-toolbar-title class="header"></v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-toolbar-items> -->
      <v-menu bottom origin="center center" transition="scale-transition" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>fas fa-user</v-icon>
          </v-btn>
        </template>

        <v-list class="blue-grey lighten-4">
          <v-list-tile>
            <router-link to="/login">
              <v-list-tile-title>Log In</v-list-tile-title>
            </router-link>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <router-link to="/registration">
              <v-list-tile-title>Registration</v-list-tile-title>
            </router-link>
          </v-list-tile>

          <v-divider></v-divider>

          <v-list-tile>
            <v-list-tile-title @click="logout()">Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <router-link to="/home">
        <v-btn icon>
          <v-icon>fas fa-home</v-icon>
        </v-btn>
      </router-link>
      <!-- </v-toolbar-items> -->
    </v-toolbar>

    <v-navigation-drawer
      class="transparent"
      width="200"
      height="auto"
      v-model="drawer"
      temporary
      fixed
    >
      <v-list class="pa-1 blue-grey lighten-2">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>Daniel Molina</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0 blue-grey lighten-4" dense>
        <v-divider></v-divider>

        <router-link to="/workout">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="black">fas fa-dumbbell</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Workout</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <v-divider></v-divider>

        <router-link to="/addword">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="black">fas fa-pencil-alt</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Add Words</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <v-divider></v-divider>

        <router-link to="/lists">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="black">fas fa-clipboard-list</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Exercise Lists</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <v-divider></v-divider>

        <router-link to="/chats">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="black">fas fa-comments</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Chat Rooms</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>

        <v-divider></v-divider>

        <router-link to="/games">
          <v-list-tile>
            <v-list-tile-action>
              <v-icon color="black">fas fa-gamepad</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>Competitions</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </router-link>
      </v-list>
    </v-navigation-drawer>

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

export default {
  name: "App",
  data() {
    return {
      src: "./assets/wordsfit_logo.png",
      drawer: null,
      toolbarColor: "rgb(255, 255, 255, 0)",
      isLoggedIn: false,
      currentUser: false
    };
  },
  methods: {
    handleScroll(event) {
      if (window.scrollY > 0) {
        this.toolbarColor = "rgb(255, 255, 255, 0.7)";
      } else {
        this.toolbarColor = "rgb(255, 255, 255, 0)";
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          alert(`Successfully logged out!`);
          this.$router.push("/");
        });
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  }
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
