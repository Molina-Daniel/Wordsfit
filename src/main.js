import Vue from "vue";
import VueChatScroll from "vue-chat-scroll"
import './plugins/vuetify'
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from 'firebase';
import './db/firebaseInit';

Vue.config.productionTip = false;
Vue.use(VueChatScroll);

let app;
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
})