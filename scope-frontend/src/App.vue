<template>
  <v-app v-if="$route.meta.plainLayout">
    <v-main>
      <router-view></router-view>
    </v-main>
    <Alerts />
  </v-app>

  <v-app v-else>
    <Navbar />

    <v-main>
      <router-view></router-view>
    </v-main>

    <Alerts />
  </v-app>
</template>

<script>
import Navbar from "@/components/common/Navbar";
import Alerts from "@/components/common/Alerts";

export default {
  name: "App",

  components: {
    Navbar,
    Alerts,
  },

  data: () => ({
    //
  }),
};
</script>
