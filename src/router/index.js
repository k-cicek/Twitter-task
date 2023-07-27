import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  // Add other route definitions here.
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = checkLoggedIn();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !loggedIn) {
    // If the route requires authentication and the user is not logged in, redirect to login
    next({ name: "login" });
  } else {
    next();
  }
});

function checkLoggedIn() {
  return !!localStorage.getItem("email");
}

export default router;
