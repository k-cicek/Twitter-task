<template>
  <div class="userModal" v-if="showModal">
    <div class="modalContent">
      <span class="close" @click="closeModal">&times;</span>
      <div class="userTweets">
        <div class="profileAvatar">
          <img :src="user.avatar" alt="Avatar" />
        </div>
        <h2>
          {{ user.first_name }} {{ user.last_name }} -
          <span>{{ user.country }}</span>
        </h2>
        <h3><i class="fas fa-envelope"></i> {{ user.email }}</h3>
        <ul>
          <li v-for="tweet in user.tweet" :key="tweet.number">
            <div class="userDetails">
              <div class="userDetailsAvatar">
                <img :src="user.avatar" alt="Avatar" />
              </div>
              <div class="userInfoModal">
                <h2>
                  {{ user.first_name }} {{ user.last_name }} -
                  <span>{{ tweet.datetime }}</span>
                </h2>
                <div class="tweetContents">
                  <p>{{ tweet.sentence }}</p>
                  <div class="actionIcon">
                    <i class="far fa-comment"></i>
                    <i class="fas fa-retweet"></i>
                    <i class="far fa-heart">&nbsp; {{ tweet.like }}</i>
                    <i class="far fa-eye"></i>
                    <i class="fas fa-share"></i>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script scoped>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    computed: {
      sortedTweets() {
        if (!this.user.tweet) return [];
        return [...this.user.tweet].sort((a, b) => a.number - b.number);
      },
    },
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
  },
};
</script>

<style scoped>
.userModal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modalContent {
  position: relative;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  max-width: 80%;
  max-height: 80%;
  overflow-y: auto;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 24px;
  font-weight: bold;
  color: #555;
}

.close:before {
  content: "";
}

.userTweets {
  margin-top: 20px;
}
.userTweets h2 {
  margin-bottom: 0;
}
.userTweets h2 span {
  font-size: 12px;
  font-weight: normal;
}
.userTweets h3 {
  font-size: 18px;
  margin: 5px 0 25px 0;
}

.userTweets ul {
  list-style: none;
  padding: 0;
}

.userTweets li {
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: rgba(10, 9, 48, 0.18) 0px 48px 100px 0px;
}

.profileAvatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  background-color: #f0f0f0;
}
.profileAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.userDetails {
  display: flex;
  align-items: flex-start;
}

.userDetailsAvatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  background-color: #f0f0f0;
}

.userDetailsAvatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.userInfoModal h2 {
  font-size: 15px;
  margin: 0;
}

.userInfoModal p {
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.userInfoModal span {
  color: #999;
  font-size: 12px;
  font-weight: lighter;
}

.tweetContents {
  width: 900px;
  max-width: 100%;
}

.actionIcon {
  display: flex;
  justify-content: space-between;
  margin-top: 13px;
}
@media only screen and (max-width: 1024px) {
  .tweetContents {
    width: 650px;
  }
}

@media only screen and (max-width: 768px) {
  .userInfoModal {
    width: 68%;
  }
}

@media only screen and (max-width: 425px) {
  .actionIcon {
    width: 230px;
  }
  .userInfoModal {
    width: 33%;
  }
}

@media only screen and (max-width: 375px) {
  .actionIcon {
    width: 200px;
  }
  .userInfoModal {
    font-size: 14px;
    width: 28%;
  }
}
</style>
