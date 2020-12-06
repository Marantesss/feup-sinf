import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Overview from '../views/Overview.vue'
import Sales from '../views/Sales.vue'
import Purchases from '../views/Purchases.vue'
import Inventory from '../views/Inventory.vue'
import Finances from '../views/Finances.vue'

Vue.use(VueRouter)

const routes = [
  /* TODO LATER
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  */
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
    path: '/finances',
    name: 'Finances',
    component: Finances
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
