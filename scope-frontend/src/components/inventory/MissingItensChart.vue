<template>
  <v-container v-if="loaded" id="chart-container">
    <bar-chart :chartData="chartData" :options="options" />
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
  data() {
    return {
      loaded: false,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "Missing Items",
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
      var auxarray = [];
      res.data.materialItems.forEach((element) => {
        var obj = {}
        obj.description = element.description;
        obj.stock = element.warehouses.reduce((acc,currV)=>{
          acc += currV.stock;
          return acc;
        },0);
        if (element.minStock != null) {
          if (element.minStock > obj.stock) {
            obj.value = element.minStock - obj.stock;
            auxarray.push(obj);
          }
        }
      });
      auxarray.sort(function(a, b){return b.value-a.value});
      auxarray = auxarray.slice(0,5);
      auxarray.forEach(element => {
        this.chartData.labels.push(element.description.length > 10
                ? element.description.substr(0, 10 - 1) + "..."
                : element.description);
        this.chartData.datasets[0].data.push(element.value);
      });
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