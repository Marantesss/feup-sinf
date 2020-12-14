<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1'>
      <v-col md='8' class='left-col pa-2'>
        <span class='title'>
          Most Valuable Items
        </span>
        <chart-wrapper style='height: 359px;'
          :stackedX=false :stackedY=false />
      </v-col>
      <v-col md='4' class='card-table'>
        <simple-table
            :data=current
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTable  from '@/components/tables/SimpleTable.vue'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import api from "@/services/api";

export default {
  components: { 
    SimpleTable,
    ChartWrapper,
  },
  name: 'MostValuableItems',
  data() {
    return {
      current: {
        title: 'Item Value',
        headers: [
          {
            text: 'Item Name',
            align: 'start',
            value: 'name',
          },
          { 
            text: 'Value',
            value: 'value' 
          },
        ],
        values: []
      }
    }
  },
  mounted () {
    api.getInventory((res)=>{
      res.data.materialItems.map((element)=>{
        this.current.values.push({
          //this.chartData.labels.push(element.description.length > 22 ? element.description.substr(0, 22-1) + '...': element.description)
          name: element.description.length > 20 ? element.description.substr(0,20-1) +'...' : element.description,
          value: element.warehouses.reduce((accumulator,currValue)=>{accumulator+=currValue.basePrice; return accumulator},0),
          route: `/product/${element.itemKey}`,
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
    > .col {
      height: 100%;
    }
  }
}

.main {
  height: 100%;
}

.table {
  height: 100%;
}

</style>
