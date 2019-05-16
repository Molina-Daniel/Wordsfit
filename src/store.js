import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import db from "@/db/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: "dmolcap@gmail.com",
    listNames: []
  },
  mutations: {
    setLists(state, payload) {
      state.listNames.push(payload);
    }
  },
  actions: {
    getAllLists(context) {
      // Get ALL documents from a collection
      db.collection("users")
        .doc(context.state.userID)
        .collection("lists")
        // .doc(this.list)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            if (doc.id != "general") {
              context.commit("setLists", doc.id)
            }
          });
        })
        .catch(error => console.log("Error getting document:", error));
    },
  },
  getters: {
    getLists(state) {
      return state.listNames;
    }
  }
});
