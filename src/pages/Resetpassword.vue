<template>
  <div class="main-container">
    <header>
      <img src="../assets/book.png" alt="logo-notfound" />
    </header>
    <div class="heading">
      <h3>Reset Password</h3>
    </div>
    <div class="form-container">
      <form @submit.prevent="">
        <div class="new-field">
          <h1>New Password</h1>
          <input
            type="password"
            v-model="new_password"
            autocomplete="off"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
          />
        </div>
        <div class="confirm-field">
          <h1>Confirm Password</h1>
          <input
            type="password"
            v-model="confirm_password"
            autocomplete="off"
            required
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
          />
        </div>
        <div class="reset-btn">
          <button @click="handleSubmit()">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import service from "../service/User";

export default {
  name: "Resetpassword",
  data() {
    return {
      new_password: "",
      confirm_password: "",
    };
  },
  methods: {
    handleSubmit() {
      let userData = {
        new_password: this.new_password,
        confirm_password: this.confirm_password,
        token: this.$route.params.token,
      };
      service
        .userReset(userData)
        .then((response) => {
          console.log(response);
          if (response.data.status == 201) {
            alert("Password reset succesfull");
            this.$router.push("/login");
            return response;
          }
          if (response.data.status == 401) {
            alert("Reset Token Not valid");
            return response;
          }
        })
        .catch((err) => {
          alert("Invalid password");
          return err;
        });
    },
  },
};
</script>


<style lang="sass" scoped>
@import "../styles/Resetpassword.scss"
</style>