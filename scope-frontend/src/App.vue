<template>
  <v-app v-if="$route.meta.plainLayout">
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>

  <v-app v-else>
    <Navbar />

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "@/components/common/Navbar";

export default {
  name: "App",

  components: {
    Navbar,

  },

  data: () => ({
    //
  }),
};
</script>
