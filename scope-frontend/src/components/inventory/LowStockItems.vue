<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1'>
      <v-col md='8' class='left-col pa-2'>
        <span class='title'>
          Low Stock Items
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
        <simple-table-flat
            :data=lowStockItems
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTableFlat      from '@/components/tables/SimpleTableFlat'
import DoughnutWrapper      from '@/components/common/DoughnutWrapper'
import LineWrapper          from '@/components/common/LineWrapper'
export default {
  components: { SimpleTableFlat, DoughnutWrapper, LineWrapper },
  name: 'LowStockItems',
  data: (() => {
    return {
      lowStockItems: {
        title: 'Current Stock',
        headers: [
          {
            text: 'Item',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Sales', value: 'sales' },
        ],
        values: [
          {
            name: 'Item 1',
            sales: '340',
            route: '/product'
          },
          {
            name: 'Item 2',
            sales: '341',
            route: '/product'
          },
          {
            name: 'Item 3',
            sales: '342',
            route: '/product'
          },
          {
            name: 'Item 4',
            sales: '343',
            route: '/product'
          },
          {
            name: 'Item 5',
            sales: '344',
            route: '/product'
          },
          {
            name: 'Item 6',
            sales: '339',
            route: '/product'
          },
          {
            name: 'Item 7',
            sales: '338',
            route: '/product'
          },
          {
            name: 'Item 8',
            sales: '337',
            route: '/product'
          },
          {
            name: 'Item 9',
            sales: '336',
            route: '/product'
          },
          {
            name: 'Item 10',
            sales: '335',
            route: '/product'
          },
          {
            name: 'Item 11',
            sales: '334',
            route: '/product'
          },
          {
            name: 'Item 12',
            sales: '333',
            route: '/product'
          },
          {
            name: 'Item 13',
            sales: '332',
            route: '/product'
          },
        ]
      }
    }
  })  
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
