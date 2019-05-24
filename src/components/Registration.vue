<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-card color="rgb(255, 255, 255, 0.6)">
          <v-card-title primary-title>
            <div class="headline">Registration</div>
          </v-card-title>

          <v-layout>
            <v-flex class="text-xs-center">
              <v-btn @click="loginGoogle()" dark color="#DD4B39">
                <v-icon left>fab fa-google</v-icon>Sign in with Google
              </v-btn>
              <!-- <v-btn dark color="#444444">
                <v-icon left>fab fa-github</v-icon>Sign in with Github
              </v-btn>-->
            </v-flex>
          </v-layout>

          <v-card-text class="pt-1">
            <div>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Enter your e-mail address"
                  v-model="email"
                  :rules="emailRules"
                  required
                ></v-text-field>
                <v-text-field
                  label="Enter your password"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'far fa-eye-slash' : 'far fa-eye'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout align-center justify-space-between>
                  <v-btn
                    @click="register"
                    :class=" { 'red darken-4 white--text' : valid }"
                    :disabled="!valid"
                    round
                  >Sign in</v-btn>
                  <router-link to="/login">
                    <p class="ma-0">Have an account already? Log In!</p>
                  </router-link>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "registration",
  data() {
    return {
      valid: false,
      e1: true,
      password: "",
      passwordRules: [v => !!v || "Password is required"],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ]
    };
  },
  methods: {
    register(e) {
      if (this.$refs.form.validate()) {
        // this.$refs.form.$el.submit();
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            console.log(user);
            console.log(user.user.email);
            console.log(user.additionalUserInfo.isNewUser);
            if (user.additionalUserInfo.isNewUser == true) {
              this.setUserInDB(user);
            }
            // this.$router.go({ path: this.$router.path });
            this.$router.push("/");
            this.$forceUpdate();
          })
          .catch(error => {
            alert(error.message);
            console.log(error.code);
          });
      }
      e.preventDefault();
    },
    clear() {
      this.$refs.form.reset();
    },
    loginGoogle() {
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          let token = result.credential.accessToken;
          // The signed-in user info.
          let user = result.user;

          if (result.additionalUserInfo.isNewUser == true) {
              this.setUserInDB(result);
            } else {
              alert(`Welcome back ${user.displayName}. It's a pleasure have you in WordsFit again!`);
            }
          this.$router.push("/");
          this.$forceUpdate();
        })
        .catch(error => {
          // Handle Errors here.
          let errorCode = error.code;
          let errorMessage = error.message;
          // The email of the user's account used.
          let email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          let credential = error.credential;

          alert("Oops. " + errorMessage);
        });
    },
    setUserInDB(user) {
      db.collection("users")
        .doc(user.user.email)
        .set({
          user_id: user.user.email
        })
        .then(() => {
          alert(`Welcome to WordsFit. It's a pleasure have you here!`);
        })
        .catch(err => console.log(err));
    }
  }
};
</script>

<style scoped>
.margintop {
  margin-top: 25px;
}
</style>
