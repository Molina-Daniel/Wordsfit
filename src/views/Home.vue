<template>
  <div class="container">
    <!-- <div>
      <Navbar/>
    </div>-->
    <div class="main">
      <div>
        <router-link to="/workout">
          <div class="text-xs-center">
            <v-btn round color="primary" dark>Workout</v-btn>
            <i class="fas fa-dumbbell"></i>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/addword">
          <div class="text-xs-center">
            <v-btn round color="primary" dark>Add Words</v-btn>
            <i class="fas fa-pencil-alt"></i>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/lists">
          <div class="text-xs-center">
            <v-btn round color="primary" dark>Workout Routines</v-btn>
            <i class="fas fa-clipboard-list"></i>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/chats">
          <div class="text-xs-center">
            <v-btn round color="primary" dark>Supplements Shop</v-btn>
            <i class="fas fa-comments"></i>
          </div>
        </router-link>
      </div>
      <div>
        <router-link to="/games">
          <div class="text-xs-center">
            <v-btn round color="primary" dark>Competitions</v-btn>
            <i class="fas fa-gamepad"></i>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/views/Navbar.vue";
export default {
  name: "home",
  components: {
    Navbar
  }
};
</script>

<style scoped>
</style>