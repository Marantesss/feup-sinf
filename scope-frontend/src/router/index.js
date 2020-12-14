import Vue from 'vue'
import VueRouter from 'vue-router'

import Overview from '@/views/Overview.vue'
import Sales from '@/views/Sales.vue'
import Purchases from '@/views/Purchases.vue'
import Inventory from '@/views/Inventory.vue'
import Finances from '@/views/Finances.vue'
import Product from '@/views/drilldown/Product.vue'
import Client from '@/views/drilldown/Client.vue'
import Supplier from '@/views/drilldown/Supplier.vue'
import Login from '@/views/Login.vue'
import store from '@/store'

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
    redirect: '/overview'
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
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: Product
  },
  {
    path: '/client/:id',
    name: 'Client',
    component: Client
  },
  {
    path: '/supplier/:id',
    name: 'Supplier',
    component: Supplier
  },
  // and finally the default route, when none of the above matches:
  {
    path: "*",
    redirect: '/overview'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

/**
 * Authenticated routes
 */
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !store.state.user.loggedIn) {
    next({ name: 'Login' });
  } else if (to.name === 'Login' && store.state.user.loggedIn) {
    next({ name: 'Overview' });
  } else {
    next();
  }
});

export default router
