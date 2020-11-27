<template>
  <div>
    <v-navigation-drawer color="primary" dark v-model="drawer" app clipped>
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
      <Datepicker />
    </v-navigation-drawer>
    <v-app-bar app color="secondary" dark clipped-left flat>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-img
          alt="Scope Logo"
          class="shrink ms-2"
          contain
          :src="require('../../assets/scope-logo-white.svg')"
          transition="scale-transition"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn text rounded :loading="loading" @click="submit">
        Logout
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import Datepicker from "@/components/common/Datepicker.vue";
import api from "@/services/api";

export default {
  name: "Navbar",

  components: {
    Datepicker,
  },

  methods: {
    submit() {
      this.loading = true;
      this.error = false;
      api.logout(
        (res) => {
          this.loading = false;
          if (res.data.status == 200) {
            // send logout action to user module
            this.$store.dispatch({
              type: "user/logOut",
            });
            // redirect to login
            this.$router.push("/login");
          } else {
            this.error = true;
          }
        },
        (err) => {
          console.log(`login error: ${err}`);
        }
      );
    },
  },

  data: () => ({
    drawer: true,
    loading: false,
    error: false,
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