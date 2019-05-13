<template>
  <div class="container">
    <div>
      <img class="logo" alt="Vue logo" src="../assets/logo.png">
      <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    </div>
    <div class="bodyText">
      <h3>Welcome to WordFit, the best Vocabulary Trainer in the world!</h3>
      <p>WordFit is a lifestyle characterized by safe, effective exercise and sound learning.</p>
      <p>WordFit can be used to accomplish any goal, from improved vocabulary to prepare exams to learn new words. The program works for everyone—people who are just starting out with a new language and people who have an extensive vocabulary already.</p>
      <p>Are you ready?</p>
    </div>
    <div>
      <router-link to="/login">
        <button>Log In</button>
      </router-link>
    </div>
    <div>
      <router-link to="/registration">
        <button>Sign In</button>
      </router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "landing",
  components: {
    // HelloWorld
  }
};
</script>

<style scoped>
.bodyText {
  font-weight: bold;
}

button {
  padding: 15px 35px;
  margin-bottom: 10px;
}
</style>