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
            </v-card-actions>

            <v-card-title primary-title>
              <div class="mb-4">
                <!-- <span>
                  <i class="fas fa-edit"></i>
                </span>-->
                <v-icon color="black" class="mr-1">fas fa-user-tag</v-icon>
                <span class="title mr-1">Name:</span>
                <span>dsfsadf asdfsad</span>
                <v-btn icon v-if="edit == true">
                  <v-icon color="black" class="ml-1">fas fa-edit</v-icon>
                </v-btn>
              </div>
              <div class="mb-4">
                <v-icon color="black" class="mr-1">fas fa-at</v-icon>
                <span class="title mr-1">Email:</span>
                <span>sdfasdf@asdfsad.com</span>
                <v-btn disabled icon v-if="edit == true">
                  <v-icon color="black" class="ml-1">fas fa-edit</v-icon>
                </v-btn>
              </div>
              <div class="mb-4">
                <v-icon color="black" class="mr-1">fas fa-key</v-icon>
                <span class="title mr-1">Password:</span>
                <v-chip>Secret</v-chip>
                <v-btn icon v-if="edit == true">
                  <v-icon color="black" class="ml-1">fas fa-edit</v-icon>
                </v-btn>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
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
      edit: true
    };
  },
  computed: {},
  methods: {
    modify() {
      this.edit = this.edit === false ? true : false;
    }
  },
  mounted() {},
  created() {
    this.$store.dispatch("getUserID");
    this.getUserID();
  }
};
</script>

<style>
</style>
