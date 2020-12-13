<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1'>
      <v-col md='8' class='left-col pa-2'>
        <span class='title'>
          Sales by Warehouse
        </span>
        <div class='charts'>
          <div class='top-half'>
            <div class='hard-coded-height'><doughnut-wrapper style='height: 176px;' /></div>
          </div>
          <div class='bottom-half'>
            <div class='hard-coded-height'><line-wrapper style='height: 176px;' /></div>
          </div>
        </div>
      </v-col>
      <v-col md='4' class='card-table'>
        <simple-table
            :data=salesByStore
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTable      from '@/components/tables/SimpleTable'
import DoughnutWrapper  from '@/components/common/DoughnutWrapper.vue'
import LineWrapper      from '@/components/common/LineWrapper.vue'
import api from '@/services/api'

export default {
  components: { SimpleTable, DoughnutWrapper, LineWrapper },
  name: 'SalesByWarehouse',
  data: () => ({
      salesByStore: {
        title: 'All-Time Sales',
        headers: [
          {
            text: 'Store',
            align: 'start',
            sortable: false,
            value: 'warehouseDescription',
          },
          { text: 'Sales', value: 'revenue' },
        ],
        values: []
      }
  }),
  mounted () {
    api.getAllSales((res)=>{
      this.salesByStore.values = res.data.salesList;
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
        > div.top-half {
          display: block;
          border-bottom: 1px solid #969696;
        }
        > div.bottom-half {
          display: block;
          padding-top: 5px;
          border-top: 1px solid #969696;
        }
      }
    }
  }
}

</style>
