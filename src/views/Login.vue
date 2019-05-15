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
      <button @click="login" class="margintop">Log In!</button>
    </div>

    <div>
      <p>
        <a href>Did you forget your password? Click here!</a>
      </p>
    </div>

    <div class="margintop">
      <p>Or Log In with:</p>
      <button>Google</button>
      <button>Facebook</button>
      <button>Twitter</button>
      <button>Github</button>
    </div>
    <div class="margintop">
      <p>Not a member yet?</p>
      <router-link to="/registration">
        <button>Sign In!</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "login",
  data() {
    return {
      email: null,
      password: null
    };
  },
  methods: {
    login(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert(`You are logged in as ${this.email}`);
          this.$router.push("/home");
        })
        .catch(error => {
          alert(error.message);
          console.log(error.code);
        });

      e.preventDefault();
    }
  }
};
</script>

<style scoped>
.margintop {
  margin-top: 30px;
}
</style>
