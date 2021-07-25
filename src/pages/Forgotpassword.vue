<template>
  <div class="main-container">
    <header>
      <img src="../assets/book.png" alt="" />
    </header>
    <div class="heading">
      <h3>Forgot Your Password?</h3>
    </div>
    <div class="form-container">
      <h1>
        Enter your email address and we'll send you a link to reset your
        password
      </h1>
      <div class="input-form">
        <h2>Email Id</h2>
        <input type="text" v-model="email" />
      </div>
      <div class="reset-btn">
        <button @click="handleSubmit()">Reset Password</button>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service/User";

export default {
  name: "Forgotpassword",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    clearForm() {
      this.email = null;
    },
    handleSubmit() {
      let userData = {
        email: this.email,
      };
      this.clearForm();
      service
        .userForgot(userData)
        .then((response) => {
          console.log(response);
          if (response.data.status == 201) {
            alert("Reset Link sent to your email please check it");
            return response;
          }
          if (response.data.status == 401) {
            alert("Email is not registered");
            return response;
          }
        })
        .catch((err) => {
          alert("Invalid crendentials");
          return err;
        });
    },
  },
};
</script>


<style lang="sass" scoped>
@import "../styles/Forgotpassword.scss"
</style>