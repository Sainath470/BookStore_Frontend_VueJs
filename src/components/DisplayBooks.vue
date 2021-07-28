<template>
  <div class="main-container">
    <h3>Books ( {{ length }} items )</h3>
    <div class="drop-down">
      <select class="options" @change="selectedOption">
        <option value="">Sort by relevance</option>
        <option value="HighToLow">price:High to Low</option>
        <option value="LowToHigh">price:Low to High</option>
      </select>
    </div>
    <div class="container">
      <div v-for="book in list" v-bind:key="book.id" class="books-container">
        <div class="books" id="books">
          <div class="image-book">
            <img v-bind:src="book.file" alt="notFound" />
          </div>
          <div class="hovering-description">
            {{ book.description }}
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
              addBookToCart(book.id);
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
      length: "",
    };
  },
  created() {
    if (localStorage.getItem("reloaded")) {
      localStorage.removeItem("reloaded");
    } else {
      localStorage.setItem("reloaded", "1");
      location.reload();
    }
    service.userDisplayBooks().then((response) => {
      console.log(response);
      this.list = response.data;
      this.length = response.data.length;
    });
  },
  watch: {
    addBook: {
      handler(val) {
        this.$emit("update-books-count", val.length);
      },
      deep: true,
    },
  },
  methods: {
    selectedOption(event) {
      if (event.target.value == "LowToHigh") {
        this.lowToHigh();
      } else if (event.target.value == "HighToLow") {
        this.highToLow();
      }
    },
    lowToHigh() {
      service.userDisplayBooks().then((response) => {
        this.list = response.data.sort(function (a, b) {
          if (a.price < b.price) return -1;
        });
        console.log(this.list);
      });
    },
    highToLow() {
      service.userDisplayBooks().then((response) => {
        this.list = response.data.sort(function (a, b) {
          if (a.price > b.price) return -1;
        });
        console.log(this.list);
      });
    },
    addBookToCart(bookId) {
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
    removeFromCart(bookId) {
      let userData = {
        token: this.$route.params.token,
        id: bookId,
      };
      service
        .removeFromCart(userData)
        .then((response) => {
          console.log(response);
          if (response.data.status == 201) {
            alert("book removed from cart");
            return response;
          }
        })
        .catch((err) => {
          alert("invalid credentials");
          return err;
        });
    },
  },
};
</script>

<style lang="sass" scoped>
@import "../styles/DisplayBooks.scss"
</style>