<template>
  <div>
    <Sidebar :show="drawer" />
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

      <v-btn text rounded> Logout </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
import Sidebar from "@/components/common/Sidebar";

export default {
  name: "Navbar",
  
  components: {
    Sidebar,
  },

  data: () => ({
    drawer: true,
  }),
};
</script>

<style>
</style>