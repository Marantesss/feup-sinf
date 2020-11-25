<script>
import { Bar } from 'vue-chartjs'

export default {
  extends: Bar,
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
    this.renderChart(this.chartData, this.options)
  }
}
</script>

<style>
</style