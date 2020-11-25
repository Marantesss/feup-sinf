<template>
  <div>
    <bar-chart  :chartData=chartData />
  </div>
</template>

<script>
import BarChart from '../charts/BarChart.vue';

export default {
  name: "ChartWrapper",
  components: {
    BarChart,
  },

  data: () => {
    return {
    chartData: {
      labels: ["January", "February","March","April","May","June","July","August","September","October","November","December"],
      datasets: [
        {
          label: "Data One",
          backgroundColor: "#f87979",
          data: [40, 20,10,55,32,32,12,54,30,20,30,40],
        },
      ],
    },}
  },
};
</script>

<style scoped>
</style>