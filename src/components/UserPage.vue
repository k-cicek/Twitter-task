<template>
  <div>
    <Navbar />
    <div class="userCards">
      <div
        v-for="user in users"
        :key="user.id"
        class="userCard"
        @click="showUserModal(user)"
      >
        <div class="avatar">
          <img :src="user.avatar" alt="Avatar" />
        </div>
        <div class="userInfoContainer">
          <h2 class="userInfo">{{ user.first_name }} {{ user.last_name }}</h2>
          <p class="userInfo">{{ user.email }}</p>
        </div>
      </div>
    </div>
    <UserModal
      v-if="selectedUser"
      :user="selectedUser"
      :showModal="isModalVisible"
      @close="closeUserModal"
    />
  </div>
</template>

<script>
import axios from "axios";
import UserModal from "@/components/UserModal.vue";
import Navbar from "@/components/AppNavbar.vue";

export default {
  components: {
    UserModal,
    Navbar,
  },
  data() {
    return {
      users: [],
      selectedUser: null,
      isModalVisible: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      axios
        .get("data.json")
        .then((response) => {
          this.users = response.data;
          console.log(this.users);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
    showUserModal(user) {
      this.selectedUser = user;
      this.isModalVisible = true;
    },
    closeUserModal() {
      this.selectedUser = null;
      this.isModalVisible = false;
    },
  },
};
</script>

<style scoped>
.userCards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 25px;
  padding: 25px;
}

.userCard {
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  height: 230px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  background-color: #fff;
  text-align: center;
  cursor: pointer;
  transition: box-shadow 0.3s, transform 0.3s;
}

.userCard:hover {
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  transform: translateY(-4px);
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 10px;
  background-color: #f0f0f0;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.userInfoContainer {
  padding: 10px 0;
}

.userInfo {
  font-size: 18px;
  margin: 0 0 5px;
}

.userInfo p {
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
