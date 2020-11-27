<template>
  <div class="my-alert-container">
    <v-alert
      v-for="alert in alerts"
      :key="alert.id"
      :type="alert.type"
      class="my-alert"
      v-model="alert.show"
      dismissible
    >
      {{ alert.message }}
    </v-alert>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Alerts",

  computed: {
    // map state getters to component
    ...mapGetters({ alerts: "alerts/alerts" }),
  },
};
</script>

<style>
.my-alert-container {
  box-sizing: border-box;
  position: fixed;

  bottom: 12px;
  right: 12px;
}

.my-alert {
  max-width: 360px;
  transition: transform 0.6s ease-in-out;
  animation: toast-in-right 0.7s;
}

@keyframes toast-in-right {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
</style>