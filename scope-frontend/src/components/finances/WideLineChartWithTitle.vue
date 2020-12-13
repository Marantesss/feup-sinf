<template>
  <v-col>
    <v-row class="elevation-10 mx-1">
      <v-col class="pa-2">
        <span class="title">
          {{ title }}
        </span>
        <v-container v-if="!loading" class="chart-container">
          <line-chart :chartData="chartData" :options="options" />
        </v-container>
        <div v-else class="d-flex justify-center align-center" style="height: 100%">
          <v-progress-circular
            :size="200"
            :width="8"
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import api from "@/services/api";
import LineChart from "@/components/charts/LineChart.vue";

export default {
  name: "WideLineChartWithTitle",

  components: {
    LineChart,
  },

  props: {
    title: String,
  },

  mounted() {
    api.getSalesOverTime(
      (res) => {
        if (res.data.status == 200) {
          this.chartData.datasets[0].data = res.data.sales;
          this.chartData.datasets[1].data = res.data.cogs;
          this.loading = false;
        }
      },
      (err) => {
        console.log(`balance sheet error: ${err}`);
      }
    );
  },

  data: () => ({
    loading: true,
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
          label: "Net Sales",
          borderColor: "#4caf50",
          data: [],
          fill: false,
        },
        {
          label: "Cost of Goods Sold",
          borderColor: "#ffc857",
          data: [],
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
  }),
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

.chart-container {
  min-height: 0;
  div {
    position: relative;
    max-height: 100%;
    width: 100%;
  }
}
</style>
