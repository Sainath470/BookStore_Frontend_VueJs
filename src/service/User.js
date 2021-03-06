import AxiosService from "./axios";

const axios = new AxiosService();

export default {
    userRegister(data) {
        return axios.postData("/auth/register", data);
    },
    userLogin(data) {
        return axios.postData("/auth/login", data);
    },
    userForgot(data) {
        return axios.postData("/auth/forgotPassword", data);
    },
    userReset(data) {
        return axios.postData("/auth/resetPassword", data);
    },
    userDisplayBooks() {
        return axios.getData("/auth/displayBooks");
    },
    userDisplayBooksInCart() {
        return axios.getData("/auth/displayBooksInCart");
    },
    customerRegister(data) {
        return axios.postData("/auth/customerRegister", data);
    },
    userOrderPlaced() {
        return axios.postData("/auth/orderPlacedSuccessfull")
    },
    addToCart(data) {
        return axios.postData("/auth/addToCart", data)
    },
    removeFromCart(data) {
        return axios.postData("/auth/removeFromCart", data)
    },
}



