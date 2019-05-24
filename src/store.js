import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase";
import db from "@/db/firebaseInit";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userID: null,
    listNames: []
  },
  mutations: {
    setUserID(state, payload) {
      state.userID = payload;
    },
    setLists(state, payload) {
      state.listNames.push(payload);
    }
  },
  actions: {
    getUserID(context) {
      context.commit("setUserID", firebase.auth().currentUser.email)
    },
    getAllLists(context) {
      // Get ALL documents from a collection
      db.collection("users")
        .doc(context.state.userID)
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
    getUserID(state) {
      return state.userID;
    },
    getLists(state) {
      return state.listNames;
    }
  }
});
