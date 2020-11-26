<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: {
    chartData: {
      type: Object,
      default: () => {return }
    },/*
    label: {
      type: String
    },ptions: {
      type: Object
    },
    chartColors: {
      type: Object
    },*/
    options: {
      type: Object,
      default: () => {return {responsive: true}}
    }

  },
  mounted () {
    this.renderChart(this.chartData)

  }
}

</script>

<style>
</style>