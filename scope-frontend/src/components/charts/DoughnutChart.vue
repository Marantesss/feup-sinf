<script>
import { Doughnut } from "vue-chartjs";

export default {
  name: "DoughnutChart",
  extends: Doughnut,
  props: {
    chartData: {
      type: Array
    },/*
    label: {
      type: String
    },
    chartColors: {
      type: Object
    }*/
    options: {
      type: Object,
      default: () => {
        return {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    }
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }

}
 
</script>

<style>
</style>
