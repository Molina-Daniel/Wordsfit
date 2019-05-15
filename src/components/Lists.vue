<template>
  <div>
    <div>
      <Navbar/>
    </div>
    <div>
      <h5>Here you can create new lists and modify them.</h5>
    </div>

    <div>
      <p>Choose a list:</p>
      <label for="saveInList">List:</label>
      <select v-model="list" name="saveInList" id="listSelect">
        <option value="general">General</option>
        <option v-for="list in listNames" :value="list" :key="list">{{ list | capitalize }}</option>
      </select>
      <button @click="getList">Show list</button>
    </div>

    <div class="mt">
      <p>Or create a new one:</p>
      <label for="newList">Name:</label>
      <input v-model="newListName" type="text" name="newList" id="newList">
      <button @click="newList">Create!</button>
    </div>

    <div>
      <p v-for="word in words" :key="word">{{ word }}</p>
    </div>
  </div>
</template>

<script>
import Navbar from "@/views/Navbar.vue";
import firebase from "firebase";
import db from "@/db/firebaseInit";

export default {
  name: "Lists",
  components: {
    Navbar
  },
  data() {
    return {
      userID: "dmolcap@gmail.com",
      list: "general",
      words: null,
      listNames: [],
      newListName: null
    };
  },
  computed: {},
  methods: {
    getAllLists() {
      // Get ALL documents from a collection
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        // .doc(this.list)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(doc.id);
            if (doc.id != "general") {
              this.listNames.push(doc.id);
            }
          });
        })
        .catch(error => console.log("Error getting document:", error));
    },
    getList() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.list)
        .get()
        .then(doc => {
          // Retrieve the keys form the object
          this.words = Object.keys(doc.data());
          // this.answers = Object.values(doc.data());
          // this.wordsAndAnswers = Object.entries(doc.data());
          // this.checkAnswer();
          // console.log(this.words);
        })
        .catch(error => console.log("Error getting document:", error));
    },
    newList() {
      db.collection("users")
        .doc(this.userID)
        .collection("lists")
        .doc(this.newListName)
        .set({
          exist: true
        })
        .then(() => {
          this.newListName = "";
          console.log("New list created!");
        })
        .catch(error => console.error("Error merging: ", error));
    }
  },
  mounted() {
    this.getAllLists();
    this.getList();
  },
  filters: {
    capitalize(value) {
      if (!value) return "";
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
.mt {
  margin-top: 10px;
}
</style>
