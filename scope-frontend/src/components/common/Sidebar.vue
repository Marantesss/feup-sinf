<template>
  <v-navigation-drawer color="primary" dark v-model="show" app clipped>
    <v-list dense>
      <router-link
        v-for="item in items"
        :key="item.text"
        :to="{ name: item.route }"
      >
        <v-list-item link>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </router-link>
    </v-list>
    <Datepicker/>
  </v-navigation-drawer >
</template>

<script>
import Datepicker from './Datepicker.vue';

export default {
  name: "Sidebar",

  components: {
    Datepicker,
  },
  
  props: {
    show: Boolean,
  },

  data: () => ({
    items: [
      {
        icon: "mdi-finance",
        text: "Overview",
        route: "Overview",
      },
      {
        icon: "mdi-truck",
        text: "Sales Orders",
        route: "Sales",
      },
      {
        icon: "mdi-cart",
        text: "Purchases",
        route: "Purchases",
      },
      {
        icon: "mdi-cube-scan",
        text: "Inventory",
        route: "Inventory",
      },
      {
        icon: "mdi-account-check",
        text: "Accounts Payable",
        route: "Accounts",
      },
    ],
  }),
};
</script>

<style>
</style>