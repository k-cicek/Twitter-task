<template>
  <nav>
    <a v-if="$store.state.email" @click="logout">Logout</a>
  </nav>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login"); // Redirect to login page after logging out
    },
  },
};
</script>
