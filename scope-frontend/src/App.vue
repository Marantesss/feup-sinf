<template>
  <v-app v-if="$route.meta.plainLayout">
    <v-main>
      <router-view></router-view>
    </v-main>
    <Alerts />
  </v-app>

  <v-app v-else>
    <Layout />

    <v-main>
      <router-view></router-view>
    </v-main>

    <Alerts />
  </v-app>
</template>

<script>
import Layout from "@/components/common/Layout";
import Alerts from "@/components/common/Alerts";

export default {
  name: "App",

  components: {
    Layout,
    Alerts,
  },

  data: () => ({
    //
  }),
};
</script>
