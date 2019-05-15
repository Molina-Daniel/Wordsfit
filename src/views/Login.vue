<template>
  <div>
    <div class="margintop">
      <img class="logo" alt="Vue logo" src="../assets/logo100px.png">
    </div>
    <div class="margintop">
      <label for="email">Email:</label>
      <div class="margintop">
        <input type="text" name="email" id="email">
      </div>
    </div>
    <div class="margintop">
      <label for="password">Password:</label>
      <div class="margintop">
        <input type="text" name="password" id="password">
      </div>
      <router-link to="/home">
        <button class="margintop">Log In!</button>
      </router-link>
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
export default {
  name: "login",
  data() {
    return {};
  }
};
</script>

<style scoped>
.margintop {
  margin-top: 30px;
}
</style>
