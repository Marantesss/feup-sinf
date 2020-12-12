<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1'>
      <v-col md='8' class='left-col pa-2'>
        <span class='title'>
          Sales by Product Category
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
            :data=salesByProductCategory
        />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTable      from '@/components/tables/SimpleTable'
import DoughnutWrapper  from '@/components/common/DoughnutWrapper.vue'
import LineWrapper      from '@/components/common/LineWrapper.vue'
export default {
  components: { SimpleTable, DoughnutWrapper, LineWrapper },
  name: 'SalesByProductCategory',
  data: (() => {
    return {
      salesByProductCategory: {
        title: 'All-Time Sales',
        headers: [
          {
            text: 'Category',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Sales', value: 'value' },
        ],
        values: [
          {
            name: 'Category 1',
            value: '340.1',
          },
          {
            name: 'Category 2',
            value: '341.1',
          },
          {
            name: 'Category 3',
            value: '342.1',
          },
          {
            name: 'Category 4',
            value: '343.1',
          },
          {
            name: 'Category 5',
            value: '344.1',
          },
          {
            name: 'Category 6',
            value: '339.1',
          },
          {
            name: 'Category 7',
            value: '338.1',
          },
          {
            name: 'Category 8',
            value: '337.1',
          },
          {
            name: 'Category 9',
            value: '336.1',
          },
          {
            name: 'Category 10',
            value: '335.1',
          },
          {
            name: 'Category 11',
            value: '334.1',
          },
          {
            name: 'Category 12',
            value: '333.1',
          },
          {
            name: 'Category 13',
            value: '332.1',
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
