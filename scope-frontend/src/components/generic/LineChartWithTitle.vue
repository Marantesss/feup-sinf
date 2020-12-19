<template>
  <v-col md="6">
    <v-row class="elevation-10 mx-1">
      <v-col class="pa-2">
        <span>
          {{ title }}
        </span>
        <line-chart
          style="height: 359px"
          :chartData="chartData"
          :options="options"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import LineChart from "@/components/charts/LineChart.vue";
export default {
  name: "LineChartWithTitle",

  components: { LineChart },

  props: {
    title: String,
    monthData: Array,
  },
  data() {
    return {
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
            label: this.title,
            borderColor: "#4caf50",
            data: this.monthData,
            fill: false,
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
        },
        plugins: {
          title: {
            display: true,
            text: "Chart.js Line Chart",
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          x: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Month",
            },
          },
          y: {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Value",
            },
          },
        },
      },
    };
  },
};
</script>

<style scoped lang='scss'>
.col {
  height: 100%;
  > .row {
    height: 100%;
    > .col {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}
</style>
