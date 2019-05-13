<template>
  <div class="container">
    <div>
      <NavigationBar/>
    </div>
    <div class="main">
      <div>
        <router-link to="/workout">
          <button>Workout</button>
        </router-link>
      </div>
      <div>
        <router-link to="/addword">
          <button>Add Words</button>
        </router-link>
      </div>
      <div>
        <router-link to="/chats">
          <button>Chat Rooms</button>
        </router-link>
      </div>
      <div>
        <router-link to="/games">
          <button>Games</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavigationBar from "@/views/NavigationBar.vue";

export default {
  name: "home",
  components: {
    NavigationBar
  }
};
</script>

<style scoped>
button {
  padding: 15px 35px;
  margin-bottom: 10px;
}
</style>
