<template>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
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
