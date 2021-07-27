<template>
  <div class="main-container">
    <div class="img">
      <img class="img-top" src="../assets/order.png" alt="notFound" />
    </div>
    <div class="message-container">
      <h6>hurray!!! your order is confirmed</h6>
      <h5>the order id is #{{ orderNumber }} save the order id for</h5>
      <h4>further communication</h4>
    </div>
    <div class="default-img">
      <img class="img-bottom" src="../assets/default.png" alt="" />
    </div>
    <div class="continue-btn">
      <button @click="handleSubmit()">CONTINUE SHOPPING</button>
    </div>
  </div>
</template>

<script>
import service from "../service/User";

export default {
  data() {
    return {
      orderNumber: "",
    };
  },
  created() {
    service.userOrderPlaced().then((response) => {
      this.orderNumber = response.data.orderId;
    });
  },
  methods: {
    handleSubmit() {
      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/Orderplace.scss"
</style>
