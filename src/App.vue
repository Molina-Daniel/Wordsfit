<template>
  <v-app class="indigo lighten-2">
    <v-toolbar flat app>
      <v-toolbar-title class="headline">
        <span>WordsFit</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <router-link to="/home">
        <v-btn flat>
          <span class="mr-2">Home</span>
          <v-icon right>fas fa-home</v-icon>
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
