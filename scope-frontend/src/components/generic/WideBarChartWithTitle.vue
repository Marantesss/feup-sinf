<template>
  <v-col>
    <v-row class="elevation-10 mx-1">
      <v-col class="pa-2">
        <span>
          {{ title }}
        </span>
        <bar-chart
          style="height: 359px"
          :chartData="chartData"
          :options="options"
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import BarChart from "@/components/charts/BarChart.vue";

export default {
  name: "WideBarChartWithTitle",

  components: {
    BarChart,
  },

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
            label: "Purchases",
            backgroundColor: "#4caf50",
            data: this.monthData,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          position: "right",
        },
        scales: {
          xAxes: [
            {
              stacked: true,
            },
          ],
          yAxes: [
            {
              stacked: true,
              ticks: {
                beginAtZero: true,
              },
            },
          ],
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
