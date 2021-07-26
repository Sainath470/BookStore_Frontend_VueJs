<template>
  <div class="main-container">
    <div class="first-container">
      <div class="length">
        <h5>My Cart()</h5>
      </div>
      <div v-for="book in list" v-bind:key="book.id" class="container">
        <div class="inside-container">
          <img v-bind:src="book.file" alt="notFound" />
          <p class="book-name">{{ book.name }}</p>
        </div>
        <div class="book-author">by {{ book.author }}</div>
        <div class="book-price">
          <h5>Rs.{{ book.price }}</h5>
        </div>
        <div class="icons">
          <i class="fas fa-minus-circle"></i>
          <input value="1" />
          <i class="fas fa-plus-circle"></i>
        </div>
      </div>
      <div class="btn-place">
        <button>Place Order</button>
      </div>
    </div>
    <div class="second-container">
      <div class="details">
        <h2>Customer Details</h2>
      </div>
      <div class="input-details">
        <form action="">
          <h3>Customer Details</h3>
          <div class="name">
            <input
              type="name"
              required
              pattern="[A-Za-z]{3,10}"
              v-model="name"
            />
            <label>Name</label>
          </div>
          <div class="phone">
            <input type="text" required v-model="phoneNumber" />
            <label>Phone Number</label>
          </div>
          <div class="pincode">
            <input type="text" required v-model="pincode" />
            <label>PinCode</label>
          </div>
          <div class="locality">
            <input type="text" required v-model="locality" />
            <label>Locality</label>
          </div>
          <div class="Address">
            <input type="text" required v-model="address" />
            <label>Address</label>
          </div>
          <div class="city">
            <input type="text" required v-model="city" />
            <label>City/Town</label>
          </div>
          <div class="landmark">
            <input type="text" required v-model="landmark" />
            <label>LandMark</label>
          </div>
          <div class="Radio-btns">
            <p>Type</p>
            <div class="btn-container">
              <input type="radio" name="type" value="Home" v-model="type" />
              <div class="first-radio-btn">
                <label>Home</label>
              </div>
              <div class="second-radio-btn">
                <input type="radio" name="type" value="Home" v-model="type" />
                <label>Work</label>
              </div>
              <div class="third-radio-btn">
                <input type="radio" name="type" value="Home" v-model="type" />
                <label>Other</label>
              </div>
            </div>
            <div class="continue-btn">
              <button>continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service/User";

export default {
  name: "cart",
  data() {
    return {
      state: true,
      list: {},
    };
  },
  mounted() {
    service.userDisplayBooksInCart().then((response) => {
      console.log(response);
      this.list = response.data;
    });
  },
};
</script>

<style lang="sass" scoped>
@import '../styles/Cart.scss'
</style>