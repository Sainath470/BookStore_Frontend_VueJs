<template>
  <div class="main-container">
    <div class="wrapper">
      <div class="container" v-if="flag">
        <img src="../assets/side.png" alt="not-loading" class="side-image" />
        <p>ONLINE BOOK SHOPPING</p>
        <form ref="form" class="form-register" @submit.prevent="">
          <div class="heading-one">
            <h5 class="login-heading">LOGIN</h5>
          </div>
          <div class="heading-two">
            <h5 @click="changeState()">SIGNUP</h5>
          </div>
          <div class="email">
            <h1>Email Id</h1>
            <input
              type="text"
              v-model="email"
              autocomplete="off"
              required
              pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            />
          </div>
          <div class="password">
            <h1>password</h1>
            <input
              :type="password_type"
              v-model="password"
              required
              pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
            />
          </div>
          <i @click="togglePassword()" class="far fa-eye-slash"></i>
          <div class="forgot-password">
            <a href="/forgotPassword">forgot password?</a>
          </div>
          <div class="login-btn">
            <button @click="handleSubmit()">Login</button>
          </div>
        </form>
      </div>
      <Register v-else />
    </div>
  </div>
</template>

<script>
import service from "../service/User";
export default {
  name: "Login",
  components: {
    Register: () => import("./Register.vue"),
  },
  data() {
    return {
      email: "",
      password: "",
      password_type: "password",
      flag: true,
    };
  },
  methods: {
    changeState() {
      this.flag = !this.flag;
    },
    togglePassword() {
      this.password_type =
        this.password_type === "password" ? "text" : "password";
    },
    handleSubmit() {
      let userData = {
        email: this.email,
        password: this.password,
      };
      service
        .userLogin(userData)
        .then((response) => {
          if (response.data.status == 201) {
            alert("User Logged in");
            localStorage.setItem("token", response.data.token);
            this.$refs.form.reset();
            this.$router.push("/dashboard");
            return response;
          }
        })
        .catch((err) => {
          alert("Invalid credentials");
          return err;
        });
    },
  },
};
</script>

<style lang="sass" scoped>
@import "@/styles/Login.scss"
</style>
