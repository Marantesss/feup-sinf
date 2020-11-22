<template>
  <v-container fluid class='grey lighten-5 mx-2 my-2'>
    <v-row>
      <v-col md='6'>
        <v-row class='elevation-10 mx-1'>
          <v-col class='pa-2'>
            Inventory by Category - Purchases vs Sales
          </v-col>
        </v-row>
      </v-col>
      <v-col md='6'>
        <v-row no-gutters class='elevation-10 mx-1'>
          <v-col md='8' class='pa-2'>
            Sales by Store
          </v-col>
          <v-col md='4' class='card-table'>
            <simple-table title='Top Sales All-Time'/>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col md='6'>
        <v-row no-gutters class='elevation-10 mx-1'>
          <v-col md='8' class='pa-2'>
            Sales by Store
          </v-col>
          <v-col md='4' class='card-table'>
            <simple-table title='Top Sales All-Time'/>
          </v-col>
        </v-row>
      </v-col>
      <v-col md='6'>
        <v-row class='elevation-10 mx-1'>
          <v-col class='pa-2'>
            Purchases and Sales Cashflow
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SimpleTable from '@/components/tables/SimpleTable'
export default {
  components: { SimpleTable },
  name: "Overview",
}
</script>

<style>

.card-table {
  border-left: 1px solid #969696;
}

</style>
