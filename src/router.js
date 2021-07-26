import Vue from 'vue'
import Register from './pages/Register.vue'
import Router from 'vue-router'
import Login from './pages/Login.vue'
import ForgotPassword from './pages/Forgotpassword.vue'
import ResetPassword from './pages/Resetpassword.vue'
import Dashboard from './components/Dashboard.vue'
import DisplayBooks from './components/DisplayBooks.vue';
import Cart from './components/Cart.vue';


Vue.use(Router)
export default new Router({
    mode: 'history',
    routes: [{
        path: '/register',
        component: Register
    },
    {
        path: '/login',
        component: Login
    },
    {
        path: '/forgotPassword',
        component: ForgotPassword
    },
    {
        path: '/resetPassword/:token',
        component: ResetPassword
    },
    {
        path: '/dashboard',
        component: Dashboard,
        children: [
            {
                path: '/displayBook',
                component: DisplayBooks,
            },
            {
                path: '/Cart',
                component: Cart,
            },
        ],
    }
    ],
})