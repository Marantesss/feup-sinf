<template>
  <v-container fluid class='grey lighten-5 mx-2 my-2'>
    <v-row>
      <v-col md='6'>
        <v-row class='elevation-10 mx-1'>
          <v-col class='pa-2'>
            Inventory by Category - Purchases vs Sales
            <chart-wrapper/>
          </v-col>
        </v-row>
      </v-col>
      <v-col md='6'>
        <v-row no-gutters class='elevation-10 mx-1'>
          <v-col md='8' class='pa-2'>
            Sales by Store
            <dougnut-wrapper/>
            <line-wrapper />
          </v-col>
          <v-col md='4' class='card-table'>
            <simple-table
              :data=salesByStore
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col md='6'>
        <v-row no-gutters class='elevation-10 mx-1'>
          <v-col md='8' class='pa-2'>
            Sales by Store
            <dougnut-wrapper />
            <line-wrapper />
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
            Purchases and Sales Cashflow
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
import DougnutWrapper from '@/components/common/DougnutWrapper.vue'
import LineWrapper from '@/components/common/LineWrapper.vue'
export default {
  components: { SimpleTable,ChartWrapper, DougnutWrapper, LineWrapper},
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
        ]
      }
    }
  })
}
</script>

<style>

.card-table {
  border-left: 1px solid #969696;
}

</style>
