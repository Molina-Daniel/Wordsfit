<template>
  <div class="container">
    <div class="main">
      <div>
        <router-link to="/workout">
          <div class="text-xs-center">
            <v-btn large round dark color="red darken-4
">
              <span>Workout</span>
              <v-icon right>fas fa-dumbbell</v-icon>
            </v-btn>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/addword">
          <div class="text-xs-center">
            <v-btn large round dark color="red darken-4
">
              <span>Add Words</span>
              <v-icon right>fas fa-pencil-alt</v-icon>
            </v-btn>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/lists">
          <div class="text-xs-center">
            <v-btn large round dark color="red darken-4
">
              <span>Exercise Lists</span>
              <v-icon right>fas fa-clipboard-list</v-icon>
            </v-btn>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/chatrooms">
          <div class="text-xs-center">
            <v-btn large round dark color="red darken-4
">
              <span>Chat Rooms</span>
              <v-icon right>fas fa-comments</v-icon>
            </v-btn>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/games">
          <div class="text-xs-center">
            <v-btn large round dark color="red darken-4
">
              <span>Competitions</span>
              <v-icon right>fas fa-gamepad</v-icon>
            </v-btn>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/Navbar.vue";

export default {
  name: "Home",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>

<style scoped>
button {
  margin-top: 1.5rem;
}
</style>