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
        values: [
          {
            name: 'Product 1',
            value: '1200'
          },
          {
            name: 'Product 2',
            value: '1200'
          },
          {
            name: 'Product 3',
            value: '1200'
          },
          {
            name: 'Product 4',
            value: '1200'
          },
          {
            name: 'Product 5',
            value: '1200'
          },
          {
            name: 'Product 6',
            value: '1200'
          },
          {
            name: 'Product 7',
            value: '1200'
          },
          {
            name: 'Product 8',
            value: '1200'
          },
          {
            name: 'Product 9',
            value: '1200'
          },
          {
            name: 'Product 10',
            value: '1200'
          },
          {
            name: 'Product 11',
            value: '1200'
          },
          {
            name: 'Product 12',
            value: '1200'
          },
          {
            name: 'Product 13',
            value: '1200'
          },
          {
            name: 'Product 14',
            value: '1200'
          },
          {
            name: 'Product 15',
            value: '1200'
          },
          {
            name: 'Product 16',
            value: '1200'
          },
        ]
      }
    }
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
