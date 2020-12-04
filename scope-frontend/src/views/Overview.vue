<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <v-col md='6'>
        <v-row class='elevation-10 mx-1'>
          <v-col class='pa-2 left-col'>
            <span class='title'>
              Inventory by Category - Purchases vs Sales
            </span>
            <chart-wrapper/>
          </v-col>
        </v-row>
      </v-col>
      <v-col md='6'>
        <v-row no-gutters class='elevation-10 mx-1'>
          <v-col md='8' class='left-col pa-2'>
            <span class='title'>
              Sales by Store
            </span>
            <div class='charts'>
              <div class='top-half'>
                <doughnut-wrapper />
              </div>
              <div class='bottom-half'>
                <line-wrapper />
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
    </v-row>
    <v-row id='core-view-row'>
      <v-col md='6'>
        <v-row no-gutters class='elevation-10 mx-1'>
          <v-col md='8' class='left-col pa-2'>
            <span class='title'>
              Sales by Store
            </span>
            <div class='charts'>
              <div class='top-half'>
                <doughnut-wrapper />
              </div>
              <div class='bottom-half'>
                <line-wrapper />
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
      <v-col md='6'>
        <v-row class='elevation-10 mx-1'>
          <v-col class='pa-2'>
            <span class='title'>
              Purchases and Sales Cashflow
            </span>
            <line-wrapper />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimpleTable from '@/components/tables/SimpleTable'
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import DoughnutWrapper from '@/components/common/DoughnutWrapper.vue'
import LineWrapper from '@/components/common/LineWrapper.vue'
export default {
  components: { SimpleTable,ChartWrapper, DoughnutWrapper, LineWrapper},
  name: "Overview",

  data: (() => {
    return {
      salesByStore: {
        title: 'Top Sales All-Time',
        headers: [
          {
            text: 'Top Sales All-Time',
            align: 'start',
            sortable: false,
            value: 'name',
          },
          { text: 'Sales', value: 'sales' },
        ],
        sales: [
          {
            name: 'Store 1',
            sales: '340.1',
          },
          {
            name: 'Store 2',
            sales: '341.1',
          },
          {
            name: 'Store 3',
            sales: '342.1',
          },
          {
            name: 'Store 4',
            sales: '343.1',
          },
          {
            name: 'Store 5',
            sales: '344.1',
          },
          {
            name: 'Store 6',
            sales: '339.1',
          },
          {
            name: 'Store 7',
            sales: '338.1',
          },
          {
            name: 'Store 8',
            sales: '337.1',
          },
          {
            name: 'Store 9',
            sales: '336.1',
          },
          {
            name: 'Store 10',
            sales: '335.1',
          },
          {
            name: 'Store 11',
            sales: '334.1',
          },
          {
            name: 'Store 12',
            sales: '333.1',
          },
          {
            name: 'Store 13',
            sales: '332.1',
          },
        ]
      }
    }
  })
}
</script>

<style scoped>

div.container {
  height: 100%;
  padding: 0;
  padding-left: 10px;
}

div.container > .row#core-view-row {
  height: 50%;
  width: 100%;
}

div.container > .row#core-view-row > .col {
  height: 100%;
}

div.container > .row#core-view-row > .col > .row {
  height: 100%;
}

div.container > .row#core-view-row > .col > .row > .col {
  height: 100%;
}

div.left-col {
  display: flex;
  flex-direction: column;
}

div.charts {
  flex-grow: 1;
  display: block;
}

div.top-half, div.bottom-half {
  height: 50%;
  display: block;
}

div.top-half {
  padding-bottom: 5px;
  border-bottom: 1px solid #969696;
}

div.bottom-half {
  padding-top: 5px;
  border-top: 1px solid #969696;
}

</style>
