<template>
  <v-container v-if="loaded" id='chart-container'>
    <doughnut-chart :chartData="chartData" :options='options' />
  </v-container>
</template>

<script>
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import api from "@/services/api";
export default {
  name: "ChartWrapper",
  components: {
    DoughnutChart,
  },
  data: () => (
     {
      loaded : false,
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
          }
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
    api.getInventory((res) => {
      const obj = {};
      res.data.materialItems.forEach((element) => {
        element.warehouses.forEach((warehouse) => {
          if(obj[warehouse.warehouseDescription]===undefined){
            obj[warehouse.warehouseDescription]= 0
          }

          obj[warehouse.warehouseDescription] += warehouse.basePrice * warehouse.stock
        });
      });

        this.chartData.labels = Object.keys(obj)
        this.chartData.datasets[0].data = Object.values(obj)
        this.loaded = true;

    });
  },
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