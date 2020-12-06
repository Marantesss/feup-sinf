<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <bar-chart-with-title :title="'Inventory by Category - Purchases vs Sales'" />
      <sales-by-store/>
    </v-row>
    <v-row id='core-view-row'>
      <sales-by-product-category/>
      <line-chart-with-title :title="'Purchases and Sales Cashflow'"/>
    </v-row>
  </v-container>
</template>

<script>
import BarChartWithTitle      from '@/components/generic/BarChartWithTitle.vue'
import SalesByStore           from '@/components/generic/SalesByStore.vue'
import LineChartWithTitle     from '@/components/generic/LineChartWithTitle.vue'
import SalesByProductCategory from '@/components/generic/SalesByProductCategory.vue'
export default {
  components: { 
    BarChartWithTitle,
    SalesByStore,
    SalesByProductCategory,
    LineChartWithTitle
  },
  name: 'Overview',
  created: (() => { document.title = 'scope - Overview' }),
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
