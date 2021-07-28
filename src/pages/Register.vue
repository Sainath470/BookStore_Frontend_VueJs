<template>
  <div class="main-container" id="wrapper">
    <div class="container" v-if="temp == true">
      <img src="../assets/side.png" alt="not-loading" class="side-image" />
      <p>ONLINE BOOK SHOPPING</p>
      <form ref="form" class="form-register" @submit.prevent="">
        <div class="heading-one">
          <h5 class="text-login" @click="changeState()">LOGIN</h5>
        </div>
        <div class="heading-two">
          <h5 class="text-signup">SIGNUP</h5>
        </div>
        <div class="fullName">
          <h1>FullName</h1>
          <input
            type="text"
            required
            v-model="fullName"
            autocomplete="off"
            pattern="[A-Za-z]{3,12}"
          />
        </div>
        <div class="email">
          <h1>Email Id</h1>
          <input
            type="text"
            required
            v-model="email"
            pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            autocomplete="off"
          />
        </div>
        <div class="password">
          <h1>password</h1>
          <input
            :type="password_type"
            v-model="password"
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
            required
          />
        </div>
        <div class="eye-icon">
          <i @click="togglePassword()" class="far fa-eye-slash"></i>
        </div>
        <div class="mobile">
          <h1>MobileNumber</h1>
          <input
            type="text"
            v-model="mobile"
            id="tel"
            pattern="^\d{10}$"
            required
            autocomplete="off"
          />
        </div>
        <div class="signup-btn">
          <button type="submit" @click="handleSubmit()">Signup</button>
        </div>
      </form>
    </div>
    <Login v-if="temp == false" />
  </div>
</template>

<script>
import service from "../service/User";
export default {
  components: {
    Login: () => import("./Login.vue"),
  },
  data() {
    return {
      temp: true,
      fullName: "",
      email: "",
      password: "",
      password_type: "password",
      mobile: "",
    };
  },
  methods: {
    changeState() {
      this.temp = !this.temp;
    },
    togglePassword() {
      this.password_type =
        this.password_type === "password" ? "text" : "password";
    },
    handleSubmit() {
      let userData = {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        mobile: this.mobile,
      };
      service
        .userRegister(userData)
        .then((response) => {
          console.log(response);
          if (response.data.status == 201) {
            alert("User registered successfully");
            this.$router.push("/login");
            this.$refs.form.reset();
            return response;
          }
          if (response.data.status == 409) {
            alert("Email already exists");
            this.$refs.form.reset();
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

<style lang="scss" scoped>
@import "@/styles/Register.scss";
</style>
