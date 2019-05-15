<template>
  <div class="container">
    <div>
      <Navbar/>
    </div>
    <div class="main">
      <div>
        <router-link to="/workout">
          <button>Workout(train)</button>
        </router-link>
      </div>
      <div>
        <router-link to="/addword">
          <button>Add Exercises(words)</button>
        </router-link>
      </div>
      <div>
        <router-link to="/lists">
          <button>Workout Routines(lists)</button>
        </router-link>
      </div>
      <div>
        <router-link to="/chats">
          <button>Supplements Shop(chat rooms)</button>
        </router-link>
      </div>
      <div>
        <router-link to="/games">
          <button>Competitions(games)</button>
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
button {
  padding: 15px 35px;
  margin-bottom: 10px;
}
</style>