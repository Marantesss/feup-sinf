<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <sales-kpis />
      <sales-by-warehouse />
    </v-row>
    <v-row id='core-view-row'>
      <line-chart-with-title title="Sales Over Time" />
      <top-consumers />
    </v-row>
  </v-container>
</template>

<script>
import SalesKpis          from '@/components/sales-orders/SalesKpis.vue'
import LineChartWithTitle from '@/components/generic/LineChartWithTitle.vue'
import SalesByWarehouse       from '@/components/sales-orders/SalesByWarehouse.vue'
import TopConsumers       from '@/components/sales-orders/TopConsumers.vue'
export default {
  components: {
    SalesKpis,
    LineChartWithTitle,
    SalesByWarehouse,
    TopConsumers
  },
  name: 'Sales',
  created: (() => { document.title = 'scope - Sales Orders' }),
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

</style>
