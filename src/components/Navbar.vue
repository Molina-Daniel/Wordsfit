<template>
  <nav>
    <!-- Toolbar -->

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
          <v-list-tile v-if="!loggedIn">
            <router-link to="/login">
              <v-list-tile-title>Log In</v-list-tile-title>
            </router-link>
          </v-list-tile>

          <v-list-tile v-if="!loggedIn">
            <router-link to="/registration">
              <v-list-tile-title>Registration</v-list-tile-title>
            </router-link>
          </v-list-tile>

          <v-list-tile v-if="loggedIn">
            <router-link to="/profile">
              <v-list-tile-title class="text--black">Profile</v-list-tile-title>
            </router-link>
          </v-list-tile>

          <v-list-tile v-if="loggedIn">
            <v-list-tile-title @click="logout()">Log Out</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <router-link to="/">
        <v-btn icon>
          <v-icon>fas fa-home</v-icon>
        </v-btn>
      </router-link>
      <!-- </v-toolbar-items> -->
    </v-toolbar>

    <!-- Drawer -->

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
          <!-- <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>-->

          <v-list-tile-content>
            <v-list-tile-title>{{ userName }}</v-list-tile-title>
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

        <router-link to="/chatrooms">
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
  </nav>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Navbar",
  data() {
    return {
      drawer: null,
      toolbarColor: "rgb(255, 255, 255, 0)",
      loggedIn: false,
      userName: false
    };
  },
  methods: {
    getUserName() {
      this.userName = this.$store.getters.getUserName;
    },
    isLoggedIn() {
      if (firebase.auth().currentUser) {
        this.loggedIn = true;
      }
    },
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
          // this.$router.go({ path: this.$router.path });
          this.$router.push("/login");
          this.$forceUpdate();
        })
        .catch(error => {
          alert(error.message);
          console.log(error.code);
        });
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
    this.$store.dispatch("getUserName");
    this.getUserName();
    this.isLoggedIn();
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
</style>
