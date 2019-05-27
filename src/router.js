import Vue from "vue";
import Router from "vue-router";
import Landing from "./views/Landing.vue";
import Login from "./components/Login.vue";
import Registration from "./components/Registration.vue";
import Home from "./views/Home.vue";
import AddWord from "./components/AddWord.vue";
import Workout from "./components/Workout.vue";
import Lists from "./components/Lists.vue";
import ChatRooms from "./components/ChatRooms.vue";
import Chat from "./components/Chat.vue";
import firebase from "firebase";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: "/",
    //   name: "landing",
    //   component: Landing
    // },
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/registration",
      name: "Registration",
      component: Registration,
      meta: {
        requiresGuest: true
      }
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/addword",
      name: "AddWord",
      component: AddWord,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/workout",
      name: "Workout",
      component: Workout,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/lists",
      name: "Lists",
      component: Lists,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/chatrooms",
      name: "ChatRooms",
      component: ChatRooms,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/enchat",
      name: "Chat",
      component: Chat,
      meta: {
        requiresAuth: true
      }
    },
  ]
});


// Nav Guards

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresGuest = to.matched.some(record => record.meta.requiresGuest);

  // Check for requiresAuth guard
  if (requiresAuth) {
    // Check if NO logged user
    if (!currentUser) {
      // Go to login
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (requiresGuest) {
    // Check if NO logged user
    if (currentUser) {
      // Go to login
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    } else {
      // Proceed to route
      next();
    }
  } else {
    // Proceed to route
    next();
  }
});

export default router;