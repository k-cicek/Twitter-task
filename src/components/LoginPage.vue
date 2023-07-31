<template>
  <div class="loginContainer">
    <form @submit="submitForm" method="post" class="loginForm">
      <h1 class="loginTitle">Login</h1>
      <label for="uname"><b>Email</b></label>
      <input
        type="email"
        placeholder="Enter Email"
        v-model="form.email"
        required
      />
      <label for="psw"><b>Password</b></label>
      <input
        type="password"
        placeholder="Enter Password"
        v-model="form.password"
        required
        @input="checkPassword"
      />
      <button type="submit" class="loginButton">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      showWarning: false,
      showSuccess: false,
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      if (this.validateLogin()) {
        this.$store.commit("login", this.form.email);
        this.showSuccess = true;
        this.$router.push("/");
      }
    },
    validateLogin() {
      if (this.form.email && this.form.password) {
        this.showWarning = false;
        return true;
      } else {
        this.showWarning = true;
        return false;
      }
    },
    checkPassword() {
      this.isLoginDisabled = !this.form.password;
    },
  },
  computed: {
    isLoginDisabled() {
      return !this.form.password;
    },
  },
};
</script>

<style>
.loginContainer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.loginForm {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 30px;
}

.loginTitle {
  text-align: center;
  margin-bottom: 20px;
}

label {
  text-align: left;
}

input {
  width: 380px;
  font-size: 14px;
  border: 1px solid #dbd9d9;
  border-radius: 5px;
  outline: 0;
  margin: 8px 0 15px 0;
  padding: 15px 10px;
}

input:focus {
  border: 1px solid #1e9bf0;
  outline: 0;
}

.loginButton {
  background-color: #b1b1b1;
  color: white;
  border: 0;
  font-size: 14px;
  font-weight: bold;
  height: 50px;
  margin-top: 10px;
  outline: 0;
  text-transform: uppercase;
  width: 100%;
  border-radius: 50px;
}

input[type="password"]:not(:placeholder-shown) + .loginButton {
  background-color: black;
  cursor: pointer;
}
/* Mobile CSS */
@media (max-width: 480px) {
  .loginForm {
    max-width: 300px;
  }
  input {
    width: 280px;
  }
}

@media (max-width: 320px) {
  .loginForm {
    max-width: 250px;
  }
  input {
    width: 230px;
  }
}
</style>
