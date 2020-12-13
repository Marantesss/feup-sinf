<template>
  <v-col>
    <v-row no-gutters class='elevation-10 mx-1'>
      <v-col md='8' class='left-col pa-2'>
        <span class='title'>
          Sales by Warehouse
        </span>
        <div class='charts d-flex justify-center align-center'>
          <div class='hard-coded-height'>
            <v-container v-if="!loading" style='height: 300px;' id='chart-container'>
              <doughnut-chart :chartData="chartData" :options='options' />
            </v-container>
            <div v-else style="height: 100%">
              <v-progress-circular
                :size="200"
                :width="8"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </div>
          </div>
        </div>
      </v-col>
      <v-col md='4' class='card-table'>
        <simple-table :data=salesByStore />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTable      from '@/components/tables/SimpleTable'
import DoughnutChart from '@/components/charts/DoughnutChart.vue'
import api from '@/services/api'

export default {
  components: { SimpleTable, DoughnutChart},
  name: 'SalesByWarehouse',
  data: () => ({
    loading: true,
    chartData: {
      labels: [],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: [
            '#f27878',
            '#f7b777',
            '#f5ec71',
            '#88e382',
            '#82edf5',
          ],
          data: [],
          fill: false,
        }
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        position: 'right'
      }
    },
    salesByStore: {
      title: 'All Warehouses',
      headers: [
        {
          text: 'Store',
          align: 'start',
          sortable: true,
          value: 'warehouseDescription',
        },
        { text: 'Sales', value: 'value' },
      ],
      values: []
    }
  }),
  mounted () {
    api.getAllSales((res)=>{
      res.data.salesList.forEach(element => {
        const key = element.warehouseDescription;
        let totalValue = this.salesByStore.values.find(x => x.warehouseDescription === key);
        if (totalValue === undefined) {
          this.chartData.labels.push(key);
          this.salesByStore.values.push(element);
        } else {
          totalValue.value += element.value;
        }
      });
      this.salesByStore.values.forEach(element => {
        this.chartData.datasets[0].data.push(element.value);
      });
      this.loading = false;
    })
  }  
}
</script>

<style scoped lang='scss'>

.col {
  height: 100%;
  > .row {
    height: 100%;
    > .col.left-col {
      height: 100%;
      display: flex;
      flex-direction: column;
      > div.charts {
        flex-grow: 1;
      }
    }
  }
}

#chart-container {
  min-height: 0;
  div {
    position: relative;
    max-height: 100%;
    width: 100%;
  }
}

</style>
