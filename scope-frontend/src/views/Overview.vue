<template>
  <div><LineChart chartdata=null /></div>
  
</template>

<script>

import LineChart from "@/components/charts/LineChart"

export default {
  name: "Overview",

  components: {
    LineChart,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
</style>