<template>
  <div>
    <Sidebar :show="showSidebar" />
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
import Sidebar from "@/components/common/Sidebar";
import api from "@/services/api";

export default {
  name: "Navbar",

  components: {
    Sidebar,
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

  computed: {
    showSidebar() {
      return this.drawer;
    },
  },

  data: () => ({
    drawer: true,
    loading: false,
    error: false,
  }),
};
</script>

<style>
</style>