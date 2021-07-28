<template>
  <div class="container">
    <header>
      <img src="../assets/book.png" alt="notFound" />
      <div class="search-input">
        <input type="search" placeholder="Search..." />
        <div class="search-icon">
          <i class="fas fa-search"></i>
        </div>
        <div class="profile-icon">
          <i class="far fa-user-circle"></i>
        </div>
        <div class="cart-icon">
          <i class="fas fa-shopping-cart" @click="changeState()"></i>
        </div>
        <div class="count-cart">
          <p>cart</p>
          <h6 v-if="booksCount">{{ booksCount }}</h6>
        </div>
      </div>
    </header>
    <div class="display-books">
      <DisplayBooks
        v-if="state == true"
        @update-books-count="(n) => (booksCount = n)"
      />
      <Cart v-if="state == false" />
      <Order v-if="flag == false" />
    </div>
  </div>
</template>

><script>
import DisplayBooks from "./DisplayBooks.vue";
import Cart from "./Cart.vue";
import Order from "./Orderplace.vue";

export default {
  name: "Dashboard",
  components: {
    DisplayBooks,
    Cart,
    Order,
  },
  data() {
    return {
      state: true,
      flag: true,
      booksCount: 0,
    };
  },
  methods: {
    changeState() {
      this.state = !this.state;
    },
  },
};
</script>


<style lang="sass" scoped>
@import "../styles/Dashboard.scss"
</style>