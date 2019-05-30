import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import db from "@/db/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: null,
    userName: null,
    userEmail: null,
    listNames: []
  },
  mutations: {
    setUserID(state, payload) {
      state.userID = payload;
    },
    setUserName(state, payload) {
      state.userName = payload;
    },
    setUserEmail(state, payload) {
      state.userEmail = payload;
    },
    setLists(state, payload) {
      state.listNames = payload;
    }
  },
  actions: {
    getUserID(context) {
      context.commit("setUserID", firebase.auth().currentUser.uid)
    },
    getUserName(context) {
      context.commit("setUserName", firebase.auth().currentUser.displayName)
    },
    getUserEmail(context) {
      context.commit("setUserEmail", firebase.auth().currentUser.email)
    },
    getAllLists(context) {
      // Get ALL documents from a collection
      db.collection("users")
        .doc(context.state.userID)
        .collection("lists")
        // .doc(this.list)
        .get()
        .then(querySnapshot => {
          let lists = []
          querySnapshot.forEach(doc => {
            lists.push(doc.id)
          });
          context.commit("setLists", lists)

        })
        .catch(error => console.log("Error getting document:", error));
    }

  },
  getters: {
    getUserID(state) {
      return state.userID;
    },
    getUserName(state) {
      return state.userName;
    },
    getUserEmail(state) {
      return state.userEmail;
    },
    getLists(state) {
      return state.listNames;
    }
  }
});
