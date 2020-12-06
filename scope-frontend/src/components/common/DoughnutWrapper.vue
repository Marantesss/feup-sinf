<template>
  <v-container id='chart-container'>
    <doughnut-chart :chartData="chartData" :options='options' />
  </v-container>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
export default {
  name: "ChartWrapper",
  components: {
    DoughnutChart,
  },
  data: () => (
     {
      chartData: {
        labels: [
          'Store 1',
          'Store 2',
          'Store 3',
          'Store 4',
          'Store 5',
          'Store 6',
          'Store 7',
          'Store 8',
          'Store 9',
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: [
              '#f27878',
              '#f7b777',
              '#f5ec71',
              '#88e382',
              '#82edf5',
              '#7979e5',
              '#ad70f4',
              '#ce75ef',
              '#fb96db'
            ],
            data: [40, 20, 10, 55, 32, 32, 12, 54, 12],
            fill: false,
          },
          {
            label: 'Data two',
            backgroundColor: [
              '#f27878',
              '#f7b777',
              '#f5ec71',
              '#88e382',
              '#82edf5',
              '#7979e5',
              '#ad70f4',
              '#ce75ef',
              '#fb96db'
            ],
            data: [10, 20, 5, 10, 32, 42, 20, 45, 5],
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: 'right'
        }
      },
    }
  )
};
</script>

<style scoped lang='scss'>

#chart-container {
  min-height: 0;
  div {
    position: relative;
    max-height: 100%;
    width: 100%;
  }
}

</style>