<template>
  <div>
    <doughnut-chart :chartData="chartData" :options=options />
  </div>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue';

export default {
  name: "ChartWrapper",
  components: {
    DoughnutChart,
  },

  data: () => (
     {
      chartData: {
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: [40, 20, 10, 55, 32, 32, 12, 54, 30, 20, 30, 40],
          },
          {
            label: "Data two",
            backgroundColor: "#696969",
            data: [10, 20, 10, 55, 32, 32, 12, 54, 30, 20, 30, 40],
          },
        ],
      },

      options: {
        
      },
    }
  ),
};
</script>

<style scoped>
</style>