import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import db from "@/db/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userEmail: null,
    userName: null,
    listNames: []
  },
  mutations: {
    setUserEmail(state, payload) {
      state.userEmail = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setLists(state, payload) {
      state.listNames.push(payload);
    }
  },
  actions: {
    getUserEmail(context) {
      context.commit("setUserEmail", firebase.auth().currentUser.email)
    },
    getUserName(context) {
      context.commit("setUserName", firebase.auth().currentUser.displayName)
    },
    getAllLists(context) {
      // Get ALL documents from a collection
      db.collection("users")
        .doc(context.state.userEmail)
        .collection("lists")
        // .doc(this.list)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            context.commit("setLists", doc.id)
          });
        })
        .catch(error => console.log("Error getting document:", error));
    }

  },
  getters: {
    getUserEmail(state) {
      return state.userEmail;
    },
    getUserName(state) {
      return state.userName;
    },
    getLists(state) {
      return state.listNames;
    }
  }
});
