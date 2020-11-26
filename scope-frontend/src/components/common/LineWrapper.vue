<template>
  <div>
    <line-chart :chartData="chartData" :options=options />
  </div>
</template>

<script>
import LineChart from '@/components/charts/LineChart.vue';

export default {
  name: "ChartWrapper",
  components: {
    LineChart,
  },

  data: () => (
     {
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
            label: "Data One",
            borderColor: "#f87979",
            data: [40, 20, 10, 55, 32, 32, 12, 54, 30, 20, 30, 40],
            fill: false,
          },
          {
            label: "Data two",
            borderColor: "#696969",
            data: [10, 20, 5, 10, 32, 42, 20, 45, 20, 30, 20, 2],
            fill: false,
          },
        ],
      },

      options: {
				responsive: true,
				plugins: {
					title: {
						display: true,
						text: 'Chart.js Line Chart'
					},
					tooltip: {
						mode: 'index',
						intersect: false,
					}
				},
				hover: {
					mode: 'nearest',
					intersect: true
				},
				scales: {
					x: {
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Month'
						}
					},
					y: {
						display: true,
						scaleLabel: {
							display: true,
							labelString: 'Value'
						}
					}
				}
			},
    }
  ),
};
</script>

<style scoped>
</style>