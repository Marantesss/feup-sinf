<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1'>
      <v-col md='8' class='left-col pa-2'>
        <span class='title'>
          Low Stock Items
        </span>
        <div class='charts d-flex justify-center align-center'>
          <div class='hard-coded-height'>
            <chart-wrapper style='height: 270px;'
              :stackedX=true :stackedY=true />
          </div>
        </div>
      </v-col>
      <v-col md='4' class='card-table'>
        <simple-table-flat :data=lowStockItems />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTableFlat      from '@/components/tables/SimpleTableFlat'
import ChartWrapper          from '@/components/inventory/MissingItensChart.vue'
import api from "@/services/api";
export default {
  components: { SimpleTableFlat, ChartWrapper },
  name: 'LowStockItems',
  data: (() => {
    return {
      lowStockItems: {
        title: 'Current Stock',
        headers: [
          {
            text: 'Product Name',
            align: 'start',
            sortable: true,
            value: 'name',
          },
          { text: 'Total Value', value: 'sales' },
        ],
        values: [
        ]
      }
    }
  }),
  mounted (){
    api.getInventory((res) =>{ 
      this.lowStockItems.values = []
      res.data.materialItems.map((element)=>{
        this.lowStockItems.values.push({
          name: element.description.length > 20 ? element.description.substr(0,20-1) +'...' : element.description,
          sales: element.warehouses.reduce((accumulator,currValue)=>{accumulator+=currValue.stock* currValue.basePrice; return accumulator},0),
          route: '/product/' + element.itemKey,
        })
      })
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

</style>
