import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import Registration from "./views/Registration.vue";
import Home from "./views/Home.vue";
import AddWord from "./components/AddWord.vue";
import Workout from "./components/Workout.vue";
import Lists from "./components/Lists.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "landing",
      component: Landing
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/registration",
      name: "registration",
      component: Registration
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/addword",
      name: "addword",
      component: AddWord
    },
    {
      path: "/workout",
      name: "workout",
      component: Workout
    },
    {
      path: "/lists",
      name: "lists",
      component: Lists
    },
  ]
});
