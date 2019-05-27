<template>
  <div>
    <v-form v-model="valid" ref="form">
      <v-text-field label="Type here..." v-model="message" required></v-text-field>
      <v-layout align-center justify-space-between>
        <v-btn
          @click="register"
          :class=" { 'red darken-4 white--text' : valid }"
          :disabled="!valid"
          round
        >Send</v-btn>
      </v-layout>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "NewMessage",
  data() {
    return {
      message: null
    };
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style scoped>
</style>
