import { createRouter, createWebHistory } from "vue-router";
import DashboardPage from "../components/DashboardPage.vue";
import LoginPage from "../components/LoginPage.vue";
import UserPage from "../components/UserPage.vue";
import TweetPage from "../components/TweetPage.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: DashboardPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/users",
    name: "user",
    component: UserPage,
  },
  {
    path: "/tweets",
    name: "tweet",
    component: TweetPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = checkLoggedIn();
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);

  if (requiresAuth && !loggedIn) {
    next({ name: "login" });
  } else {
    next();
  }
});

function checkLoggedIn() {
  return !!localStorage.getItem("email");
}

export default router;
