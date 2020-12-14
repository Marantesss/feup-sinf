<template>
  <v-container id="chart-container">
    <bar-chart v-if="loaded" :chartData="chartData" :options="options" />
  </v-container>
</template>

<script>
import BarChart from "@/components/charts/BarChart.vue";
import api from "@/services/api";

export default {
  name: "ChartWrapper",
  props: ["stackedX", "stackedY"],
  components: {
    BarChart,
  },
  // computed() {

  // },
  data() {
    return {
      loaded : false,
      chartData: {
        labels: [
        ],
        datasets: [
          {
            label: "€",
            backgroundColor: "#ffc857",
            data: [],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
          display: false
        },
        scales: {
          xAxes: [
            {
              stacked: this.stackedX,
            },
          ],
          yAxes: [
            {
              stacked: this.stackedY,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    };
  },

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