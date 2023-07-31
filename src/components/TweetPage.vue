<template>
  <div>
    <Navbar />
    <div class="tweetContainer">
      <h1>This Month's Tweets</h1>
      <div v-for="user in user" :key="user.id" class="tweetCard">
        <div v-if="user.tweet.length > 0" class="userTweet">
          <ul>
            <li v-for="tweet in user.tweet" :key="tweet.number">
              <div class="userDetail">
                <div class="tweetAavatar">
                  <img :src="user.avatar" alt="Avatar" />
                </div>
                <div class="userTweetInfo">
                  <h2>
                    {{ user.first_name }} {{ user.last_name }} -
                    <span>{{ tweet.datetime }}</span>
                  </h2>
                  <div class="tweetContent">
                    <p>{{ tweet.sentence }}</p>
                    <div class="actionIcons">
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
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "@/components/AppNavbar.vue";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      user: [],
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
          this.user = response.data.map((user) => ({
            ...user,
            tweet: user.tweet.filter(
              (tweet) => new Date(tweet.datetime).getMonth() === 5
            ),
          }));
          console.log(this.user);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    },
    logout() {
      this.$store.commit("logout");
      this.$router.push("/login");
    },
  },
};
</script>
<style scoped>
.tweetContainer {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 1000px;
  margin: auto;
}

.tweetContainer h1 {
  font-size: 20px;
}

.userTweet ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.userTweet li {
  display: flex;
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #fff;
  margin-bottom: 10px;
  box-shadow: rgba(10, 9, 48, 0.18) 0px 48px 100px 0px;
  width: 100% !important;
  overflow: hidden;
}

.userDetail {
  display: flex;
  align-items: flex-start;
}

.tweetAavatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  background-color: #f0f0f0;
}
.userTweetInfo {
  width: 100%;
}

.userTweetInfo h2 {
  font-size: 15px;
  margin: 0;
}

.userTweetInfo p {
  font-size: 14px;
  color: #666;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
}

.userTweetInfo span {
  color: #999;
  font-size: 12px;
  font-weight: lighter;
}

.actionIcons {
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
}

.tweetContent {
  width: 900px;
  max-width: 100%;
}

@media only screen and (max-width: 1024px) {
  .userTweet {
    width: 95%;
  }
  .tweetContent {
    width: 850px;
  }
}

@media only screen and (max-width: 768px) {
  .userTweetInfo {
    width: 68%;
  }
}

@media only screen and (max-width: 425px) {
  .actionIcons {
    width: 300px;
  }
  .userTweetInfo {
    width: 33%;
  }
}

@media only screen and (max-width: 375px) {
  .actionIcons {
    width: 250px;
  }
  .userTweetInfo {
    width: 28%;
  }
}
</style>
