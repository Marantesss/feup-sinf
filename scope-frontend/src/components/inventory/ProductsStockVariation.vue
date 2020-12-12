<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1'>
      <v-col md='8' class='left-col pa-2'>
        <span class='title'>
          Products Stock Variation
        </span>
        <chart-wrapper style='height: 359px;'
          :stackedX=false :stackedY=false />
      </v-col>
      <v-col md='4' class='card-table'>
        <simple-table-flat
            :data=current
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTableFlat  from '@/components/tables/SimpleTableFlat'
import ChartWrapper from '@/components/common/ChartWrapper'

export default {
  components: { 
    SimpleTableFlat,
    ChartWrapper,
  },
  name: 'Products Stock Variation',
  data() {
    return {
      current: {
        title: 'Total Units In Stock',
        headers: [
          {
            text: 'Product Name',
            align: 'start',
            value: 'name',
          },
          { 
            text: 'Stock',
            value: 'value' 
          },
        ],
        values: [
          {
            name: 'Product 1',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 2',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 3',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 4',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 5',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 6',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 7',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 8',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 9',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 10',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 11',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 12',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 13',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 14',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 15',
            value: '1200',
            route: '/product'
          },
          {
            name: 'Product 16',
            value: '1200',
            route: '/product'
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
