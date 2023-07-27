<template>
  <nav>
    <!-- <router-link v-if="!$store.state.email" to="/login">Login</router-link> -->
    <!-- <a v-if="$store.state.email" @click="logout">Logout</a> -->
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login"); // Redirect to login page after logging out
    },
  },
  mounted() {
    this.$store.commit("initialiseStore");
  },
};
</script>
```
