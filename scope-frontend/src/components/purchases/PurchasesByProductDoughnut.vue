<template>
  <v-container id='chart-container'>
    <doughnut-chart v-if="loaded" :chartData="chartData" :options='options' />
  </v-container>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import api from '@/services/api'
export default {
  name: "ChartWrapper",
  components: {
    DoughnutChart,
  },
  data: () => (
     {
       loaded: false,
      chartData: {
        labels: ['Store 1',
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
            data: [40, 20],
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
  ),

  mounted() {
    api.getPurchasesbyProduct((res)=>{
        console.log(res)
        this.chartData.labels = []
        this.chartData.datasets[0].data = []
        res.data.forEach(element => {
          this.chartData.labels.push(element.description)
          this.chartData.datasets[0].data.push(element.value)
        });
        this.loaded = true
    })



  }

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