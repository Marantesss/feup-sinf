<script>
import { Line } from "vue-chartjs";

export default {
  name: "LineChart",
  extends: Line,
  props: {
    chartData: {
      type: Array
    }
  },
  mounted () {
    this.renderChart(this.chartdata)
  }
}

</script>

<style>
</style