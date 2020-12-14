<template>
  <v-container v-if="loaded" id='chart-container'>
    <doughnut-chart  :chartData="chartData" :options='options' />
  </v-container>
  <div v-else style="height: 100%">
    <v-progress-circular
      :size="200"
      :width="8"
      indeterminate
      color="primary"
    ></v-progress-circular>
  </div>
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
        labels: [],
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
            data: [],
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
    api.getSuppliers((res)=>{
        this.chartData.labels = []
        this.chartData.datasets[0].data = []
        res.data.forEach(element => {
          this.chartData.labels.push(element.supplierName.length > 22 ? element.supplierName.substr(0, 22-1) + '...': element.supplierName)
          this.chartData.datasets[0].data.push(element.price)
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