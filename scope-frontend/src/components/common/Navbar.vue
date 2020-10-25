<template>
  <div>
    <Sidebar :show="drawer" />
    <v-app-bar app color="secondary" dark clipped-left flat>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

        Scope Logo Here
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