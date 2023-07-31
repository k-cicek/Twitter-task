<template>
  <nav class="navbar">
    <div class="navLeft">
      <router-link to="/">Dashboard</router-link>
      <router-link to="/users">Users</router-link>
      <router-link to="/tweets">Tweets</router-link>
    </div>
    <div class="navRight">
      <a v-if="$store.state.email" @click="logout">Logout</a>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 10px;
  font-weight: bold;
}

.navbar a {
  color: #fff;
  text-decoration: none;
  padding: 10px 20px;
}

.navbar a.routerLinkExactActive {
  color: #42b983;
}

.navbar a:hover {
  background-color: #555;
}

.navLeft {
  display: flex;
}
.navRight {
  cursor: pointer;
}

.navbar a.router-link-exact-active {
  color: #42b983;
}

@media (max-width: 525px) {
  .navbar a {
    font-size: 13px;
    padding: 5px 10px;
  }
}
</style>
