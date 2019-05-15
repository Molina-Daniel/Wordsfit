<template>
  <div>
    <div class="margintop">
      <img class="logo" alt="Vue logo" src="../assets/logo100px.png">
    </div>
    <div class="margintop">
      <label for="email">Email:</label>
      <div class="margintop">
        <input v-model="email" type="text" name="email" id="email">
      </div>
    </div>
    <div class="margintop">
      <label for="password">Password:</label>
      <div class="margintop">
        <input v-model="password" type="password" name="password" id="password">
      </div>

      <router-link to="/home">
        <button class="margintop" @click="register">Sign In!</button>
      </router-link>
    </div>
    <div class="margintop">
      <p>Or Sign In with:</p>
      <button>Google</button>
      <button>Facebook</button>
      <button>Twitter</button>
      <button>Github</button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "registration",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    register(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert(`Account created for ${this.email}`);
          this.$router.push("/home");
        })
        .catch(error => alert(error.message));

      // e.preventDefault();
    }
  }
};
</script>

<style scoped>
.margintop {
  margin-top: 25px;
}
</style>
