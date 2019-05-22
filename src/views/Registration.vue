<template>
  <v-container fluid fill-height class="loginOverlay">
    <v-layout flex align-center justify-center>
      <v-flex xs12 sm4 elevation-6>
        <!-- <v-toolbar class="blue darken-4">
          <v-toolbar-title class="white--text">
            <h4>Sign In</h4>
          </v-toolbar-title>
          <v-toolbar-items></v-toolbar-items>
        </v-toolbar>-->
        <v-card>
          <v-card-title primary-title>
            <div>
              <div class="headline">Registration</div>
            </div>
          </v-card-title>

          <v-layout>
            <v-flex>
              <v-card-actions>
                <v-btn color="#DD4B39">
                  <v-icon left>fab fa-google</v-icon>Sign in with Google
                </v-btn>
              </v-card-actions>
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
                  :append-icon="e1 ? 'far fa-eye' : 'far fa-eye-slash'"
                  @click:append="() => (e1 = !e1)"
                  :type="e1 ? 'password' : 'text'"
                  :rules="passwordRules"
                  counter
                  required
                ></v-text-field>
                <v-layout justify-space-between>
                  <v-btn
                    @click="submit"
                    :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }"
                  >Login</v-btn>
                  <a href>Forgot Password</a>
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

export default {
  name: "registration",
  data() {
    return {
      valid: false,
      e1: false,
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
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert(`Account created for ${this.email}`);
          this.$router.push("/home");
        })
        .catch(error => {
          alert(error.message);
          console.log(error.code);
        });

      // e.preventDefault();
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.$refs.form.$el.submit();
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>

<style scoped>
.margintop {
  margin-top: 25px;
}
</style>
