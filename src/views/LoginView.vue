<template>
  <div class="login_container">
    <img src="../assets/twitter-logo.png" alt="" srcset="" />
    <form @submit="submitForm" method="post" class="login_form">
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
      <button type="submit" class="login_button">Login</button>
      <p v-if="showWarning" class="warning-message">
        Please enter valid email and password.
      </p>
      <p v-if="showSuccess" class="success-message">Logged in successfully!</p>
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
      showWarning: false, // Add a data property to control the warning message display
      showSuccess: false, // Add a data property to control the success message display
    };
  },
  methods: {
    submitForm(event) {
      event.preventDefault();
      if (this.validateLogin()) {
        this.$store.commit("login", this.form.email);
        this.showSuccess = true; // Show success message after successful login
        this.$router.push("/");
      }
    },
    validateLogin() {
      // Implement your login validation logic here.
      if (this.form.email && this.form.password) {
        this.showWarning = false; // Hide the warning message if the input is valid
        return true;
      } else {
        this.showWarning = true; // Show the warning message if the input is invalid
        return false;
      }
    },
    checkPassword() {
      // Şifre alanının değerini kontrol et ve login butonunun durumunu güncelle
      this.isLoginDisabled = !this.form.password;
    },
  },
  computed: {
    // Aktif olup olmadığını hesaplanan bir data özelliği
    isLoginDisabled() {
      return !this.form.password;
    },
  },
};
</script>

<style>
/* Add some basic styling for the warning and success messages */
/* .warning-message {
  color: red;
  margin-top: 10px;
}

.success-message {
  color: green;
  margin-top: 10px;
} */

form.login_form {
  background-color: #fff;
  border-radius: 5px;
  margin: 50px auto 0 auto;
  padding: 25px 15px;
  text-align: center;
  width: 100%;
}

input {
  border: 1px solid #dbd9d9;
  display: block;
  font-size: 12px;
  margin-bottom: 15px;
  outline: 0;
  padding: 9px 12px;
  width: 100%;
}
input:focus {
  border: 1px solid #1e9bf0;
  outline: 0;
}

.login_button {
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

input[type="password"]:not(:placeholder-shown) + .login_button {
  background-color: black;
  cursor: pointer;
}
</style>
