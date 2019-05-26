<template>
  <div>
    <v-card color="rgb(255, 0, 0, 0)" flat>
      <v-card-text>
        <h1 class="text-xs-center">
          Lists
          <i class="fas fa-clipboard-list"></i>
        </h1>
        <p class="text-xs-center ma-0">Here you can check, create and modify your lists.</p>
      </v-card-text>
    </v-card>

    <v-container color="rgb(255, 255, 255, 0.7)" fluid grid-list-sm>
      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 255, 255, 0.3)" tile flat>
                <v-card-text class="text-xs-center title">Choose one of your lists:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row>
                <v-flex xs12>
                  <v-select
                    v-model="list"
                    :items="lists"
                    @change="getList()"
                    label="Lists"
                    class="font-weight-bold mt-1"
                    hide-details
                    outline
                    single-line
                    :menu-props="{ auto: true }"
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex d-flex xs12>
          <v-layout row wrap>
            <v-flex d-flex xs12>
              <v-card color="rgb(255, 255, 255, 0.3)" tile flat>
                <v-card-text class="text-xs-center title">Or create a new one:</v-card-text>
              </v-card>
            </v-flex>

            <v-flex d-flex>
              <v-layout row align-center>
                <v-flex xs8>
                  <v-text-field
                    v-model="newListName"
                    label="Type a name"
                    class="mt-1"
                    hide-details
                    outline
                    clearable
                  ></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-btn @click="newList" dark round color="red darken-4">Create!</v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>

      <v-card class="mt-1" v-if="words.length > 0" color="rgb(255, 255, 255, 0.7)">
        <v-card-text>
          <p v-for="(word, i) in words" :key="word">
            <strong>{{ word }}</strong> =
            <span v-for="answer in answers[i]" :key="answer">{{ answer+", " }}</span>
          </p>
        </v-card-text>
      </v-card>
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
import db from "@/db/firebaseInit";

export default {
  name: "Lists",
  components: {
    Navbar
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  created() {}
};
</script>

<style>
.v-card__text {
  padding: 8px;
  width: 100%;
}
</style>
