<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" class="mt-2" flat>
      <v-card-text>
        <h1 class="text-xs-center">
          Profile
          <i class="fas fa-id-card"></i>
        </h1>
        <p class="text-xs-center mb-0">You can check and modify your account information</p>
      </v-card-text>
    </v-card>

    <v-container fluid grid-list-sm>
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card color="rgb(255, 255, 255, 0.5)">
            <v-card-actions class="text-xs-right">
              <v-btn @click="modify()" class round dark color="red darken-4 ">
                <span v-if="edit == true">Stop</span> &nbsp; Modify
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn
                @click.stop="dialog = true"
                class
                round
                dark
                color="red darken-4 "
              >Delete Account</v-btn>

              <v-dialog v-model="dialog" max-width="290">
                <v-card>
                  <v-card-title class="headline">Delete Account</v-card-title>

                  <v-card-text>You are about delete your account in WordsFit. Are you sure?</v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="green darken-1"
                      flat="flat"
                      @click="dialog = false"
                    >NO! Please nooo!</v-btn>

                    <v-btn
                      dark
                      round
                      color="red darken-4"
                      @click="deleteAcc(); dialog = false"
                      flat="flat"
                    >Yeah! Bye bye!</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-card-actions>

            <v-card-title primary-title>
              <div class="mb-1">
                <v-form v-model="valid" ref="form">
                  <v-icon color="black" class="mr-1">fas fa-user-tag</v-icon>
                  <span class="title mr-1">Name:</span>
                  <v-text-field
                    v-model="userName"
                    :append-outer-icon="edit && valid ? 'fas fa-edit' : ''"
                    @click:append-outer="changeUserName()"
                    :readonly="edit == false"
                    required
                    :rules="nameRules"
                    single-line
                    label="Enter a name or nick"
                    type="text"
                  ></v-text-field>
                </v-form>
              </div>
              <div class="mb-1">
                <v-form v-model="valid" ref="form">
                  <v-icon color="black" class="mr-1">fas fa-at</v-icon>
                  <span class="title mr-1">Email:</span>
                  <v-text-field
                    class="input"
                    v-model="userEmail"
                    readonly
                    required
                    single-line
                    label="Enter an e-mail account"
                    type="text"
                  ></v-text-field>
                </v-form>
                <!-- <v-btn class="ma-0" icon :disabled="googleAccount" v-if="edit == true">
                  <v-icon color="black" class="ml-1">fas fa-edit</v-icon>
                </v-btn>-->
              </div>
              <div class="mb-1">
                <v-form v-model="valid" ref="form">
                  <v-icon color="black" class="mr-1">fas fa-key</v-icon>
                  <span class="title mr-1">Password:</span>
                  <v-text-field
                    v-if="googleAccount == false"
                    v-model="newPass"
                    :append-outer-icon="edit ? 'fas fa-edit' : ''"
                    @click:append-outer="changeUserPass()"
                    :readonly="edit == false"
                    :rules="passwordRules"
                    counter
                    required
                    single-line
                    label="**********"
                    type="text"
                  ></v-text-field>
                  <v-chip v-if="googleAccount == true">Secret</v-chip>
                </v-form>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

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
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import firebase from "firebase";

export default {
  name: "Profile",
  components: {
    Navbar
  },
  data() {
    return {
      dialog: false,
      valid: false,
      edit: false,
      googleAccount: false,
      userName: "",
      nameRules: [
        v => !!v || "A name or nick is required",
        v => v.length > 1 || "Name must be min 2 characteres or longer"
      ],
      userEmail: "",
      newPass: "******",
      passwordRules: [
        v => !!v || "Password is required",
        v => v.length > 5 || "Password must be 6 characteres or longer"
      ],
      snackbar: false,
      y: "top",
      x: null,
      mode: "multi-line",
      timeout: 2000,
      newListMsg: null,
      color: null
    };
  },
  computed: {},
  methods: {
    modify() {
      this.edit = this.edit === false ? true : false;
    },
    getUserName() {
      this.userName = this.$store.getters.getUserName;
    },
    getUserEmail() {
      this.userEmail = this.$store.getters.getUserEmail;
    },
    checkUserProvider() {
      let userProvider = firebase.auth().currentUser.providerData[0].providerId;
      if (userProvider == "google.com") {
        this.googleAccount = true;
      }
    },
    getUserInfo() {
      console.log(firebase.auth().currentUser.providerData[0].providerId);
    },
    changeUserName() {
      let user = firebase.auth().currentUser;
      user
        .updateProfile({
          displayName: this.userName
        })
        .then(() => {
          this.newListMsg = "Name changed!";
          this.color = "success";
          this.snackbar = true;
        })
        .catch(error => {
          console.error("Error changing email: ", error);
          alert(error.message);
        });
      console.log(user);
    },
    // changeUserEmail() {
    //   let user = firebase.auth().currentUser;
    //   user
    //     .updateEmail(this.userEmail)
    //     .then(() => {
    //       this.newListMsg = "Email changed!";
    //       this.color = "success";
    //       this.snackbar = true;
    //     })
    //     .catch(error => {
    //       console.error("Error changing email: ", error);
    //       alert(error.message);
    //     });
    //   console.log(user);
    // },
    changeUserPass() {
      let user = firebase.auth().currentUser;
      user
        .updatePassword(this.newPass)
        .then(() => {
          this.newListMsg = "Pass changed!";
          this.color = "success";
          this.snackbar = true;
        })
        .catch(error => {
          console.error("Error changing password: ", error);
          alert(error.message);
          // this.newListMsg = error.message;
          // this.color = "red darken-1";
          // this.snackbar = true;
        });
      console.log(user);
    },
    deleteAcc() {
      firebase
        .auth()
        .currentUser.delete()
        .then(() => {
          alert(`Your account has been deleted. Hope see you soon!`);
          this.$router.push("/");
        })
        .catch(error => {
          alert(error.message);
          console.log(error);
        });
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getUserName");
    this.getUserName();
    this.$store.dispatch("getUserEmail");
    this.getUserEmail();
    this.checkUserProvider();
    this.getUserInfo();
  }
};
</script>

<style scoped>
/* .input {
  text-decoration: none;
  color: black;
} */

.input-group--disabled.checkbox .input-group__input {
  color: #000 !important;
}

.input-group--disabled.input-group--select label {
  color: #000 !important;
}
.v-input--is-disabled {
  color: #000 !important;
}
</style>
