import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Overview from '../views/Overview.vue'
import Sales from '../views/Sales.vue'
import Purchases from '../views/Purchases.vue'
import Inventory from '../views/Inventory.vue'
import Accounts from '../views/Accounts.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      plainLayout: true
    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/overview',
    name: 'Overview',
    component: Overview
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/purchases',
    name: 'Purchases',
    component: Purchases
  },
  {
    path: '/inventory',
    name: 'Inventory',
    component: Inventory
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: Accounts
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
