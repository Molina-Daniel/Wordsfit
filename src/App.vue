<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline">
        <span>WordsFit</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/home">
        <v-btn>
          <span class="mr-2">Home</span>
          <v-icon>fas fa-home</v-icon>
        </v-btn>
      </router-link>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      //
    };
  }
};
</script>
