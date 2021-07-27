<template>
  <div class="main-container">
    <h3>Books({{ list.length }} items )</h3>
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
        <div class="bag-btn" v-if="!addBook.includes(book.id)">
          <button
            @click="
              addBook.push(book.id);
              handleSubmit(book.id);
            "
          >
            ADD TO BAG
          </button>
          <button>WISHLIST</button>
        </div>
        <div class="addbag-btn" v-else>
          <button
            type="submit"
            @click="
              addBook = addBook.filter((id) => id !== book.id);
              removeFromCart(book.id);
            "
          >
            ADDED TO CART
          </button>
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
      flag: true,
      addBook: [],
      list: {},
      clickedCard: "",
    };
  },
  mounted() {
    service.userDisplayBooks().then((response) => {
      this.list = response.data;
    });
  },
  methods: {
    handleSubmit(bookId) {
      let userData = {
        token: this.$route.params.token,
        id: bookId,
      };
      service
        .addToCart(userData)
        .then((response) => {
          if (response.data.status == 201) {
            alert("book added to cart");
            return response;
          }
        })
        .catch((err) => {
          alert("invalid crendentials");
          return err;
        });
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/DisplayBooks.scss"
</style>