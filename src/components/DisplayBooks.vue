<template>
  <div class="main-container">
    <div class="container">
      <div v-for="book in list" v-bind:key="book.id" class="books-container">
        <div class="books" id="books">
          <div class="image-book">
            <img v-bind:src="book.file" alt="notFound" />
          </div>
          <div class="book-title">
            {{ book.name }}
          </div>
          <div class="book-author">by {{ book.author }}</div>
          <div class="book-price">Rs. {{ book.price }}</div>
        </div>
        <div class="bag-btn" v-if="state == true">
          <button @click="changeState()">ADD TO BAG</button>
          <button>WISHLIST</button>
        </div>
        <div class="addbag-btn" v-if="state == false">
          <button @click="changeState()">ADDED TO CART</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import service from "../service/User";

export default {
  name: "Displaybooks",
  data() {
    return {
      state: true,
      list: {},
    };
  },
  mounted() {
    service.userDisplayBooks().then((response) => {
      console.log(response);
      this.list = response.data;
    });
  },
  methods: {
    changeState() {
      this.state = !this.state;
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/DisplayBooks.scss"
</style>