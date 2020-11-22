<script>
import { Bar } from "vue-chartjs";

export default {
  name: "BarChart",
  extends: Line,
  props: {
    chartData: {
      type: Array
    }/*,
    label: {
      type: String
    },ptions: {
      type: Object
    },
    chartColors: {
      type: Object
    }*/

  },
  mounted () {
    this.renderChart(this.chartdata)
  }
}

</script>

<style>
</style