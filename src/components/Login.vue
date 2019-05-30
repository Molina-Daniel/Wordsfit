<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <v-card color="rgb(255, 255, 255, 0.6)">
          <v-card-title primary-title>
            <div class="headline">Log In</div>
          </v-card-title>

          <v-layout>
            <v-flex class="text-xs-center">
              <v-btn @click="loginGoogle()" dark color="#DD4B39">
                <v-icon left>fab fa-google</v-icon>Log in with Google
              </v-btn>
              <!-- <v-btn dark color="#444444">
                <v-icon left>fab fa-github</v-icon>Log in with Github
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
                  :append-icon="e1 ? 'far fa-eye-slash' : 'far fa-eye'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout align-center justify-space-between row>
                  <v-flex>
                    <v-btn
                      @click="loginPassword"
                      :class=" { 'red darken-4 white--text' : valid }"
                      :disabled="!valid"
                      round
                    >Login</v-btn>
                  </v-flex>

                  <!-- Dialog -->
                  <v-flex>
                    <v-dialog v-model="dialog">
                      <template v-slot:activator="{ on }">
                        <a v-on="on">Forgot Password? Restore it!</a>
                      </template>
                      <v-card>
                        <v-card-title>
                          <span class="headline">Password Restoration</span>
                        </v-card-title>
                        <v-card-text>
                          <v-container grid-list-md>
                            <v-layout wrap>
                              <v-flex xs12 sm6 md4>
                                <p>An email will be send to your existing email account to restore your password</p>
                                <v-form v-model="validRest" ref="form">
                                  <v-text-field
                                    label="Enter your e-mail address"
                                    v-model="emailRest"
                                    :rules="emailRules"
                                    required
                                  ></v-text-field>
                                </v-form>
                              </v-flex>
                            </v-layout>
                          </v-container>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn dark round color="red darken-4" @click="dialog = false">Cancel</v-btn>
                          <v-btn
                            :class=" { 'red darken-4 white--text' : validRest }"
                            :disabled="!validRest"
                            round
                            @click="resetPass(); dialog = false"
                            @press="dialog = false"
                          >Send</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                    <router-link to="/registration">
                      <p class="ma-0">No account yet? Sign In!</p>
                    </router-link>
                  </v-flex>
                </v-layout>
              </v-form>
            </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-snackbar
      class="mt-5 title"
      v-model="snackbar"
      :color="color"
      :bottom="y === 'bottom'"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      <v-icon v-if="color === 'success'">fas fa-check-circle</v-icon>
      <v-icon v-else>fas fa-times-circle</v-icon>
      {{ newListMsg }}
      <v-btn dark flat @click="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "login",
  data() {
    return {
      dialog: false,
      valid: false,
      e1: true,
      password: "",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length > 5 || "Password must be 6 characteres or longer"
      ],
      email: "",
      emailRules: [
        v => !!v || "E-mail is required",
        v =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "E-mail must be valid"
      ],
      emailRest: "",
      validRest: false,
      snackbar: false,
      y: "top",
      x: null,
      mode: "multi-line",
      timeout: 2000,
      newListMsg: null,
      color: null
    };
  },
  methods: {
    loginPassword(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          console.log(user);
          alert(
            `Welcome back ${
              this.email
            }. It's a pleasure have you in WordsFit again!`
          );
          // this.$router.go({ path: this.$router.path });
          this.$router.push("/");
          this.$forceUpdate();
        })
        .catch(error => {
          alert(error.message);
          console.log(error.code);
        });

      e.preventDefault();
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
          console.log(result);

          if (result.additionalUserInfo.isNewUser == true) {
            this.setUserInDB(result);
          } else {
            alert(
              `Welcome back ${
                user.displayName
              }. It's a pleasure have you in WordsFit again!`
            );
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
    },
    resetPass() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.emailRest)
        .then(() => {
          this.newListMsg = "Email sent!";
          this.color = "success";
          this.snackbar = true;
        })
        .catch(error => {
          console.error("Error recovering password: ", error);
          alert(error.message);
        });
    }
  }
};
</script>

<style scoped>
.margintop {
  margin-top: 30px;
}
</style>
