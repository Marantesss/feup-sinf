<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: () => { return }
    },/*
    label: {
      type: String
    },
    chartColors: {
      type: Object
    },*/
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