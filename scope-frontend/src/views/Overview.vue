<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <sales-kpis />
      <purchase-kpis />
    </v-row>
    <v-row id='core-view-row'>
      <total-stock-value />
      <financial-kpis />
    </v-row>
  </v-container>
</template>

<script>
import SalesKpis          from '@/components/sales-orders/SalesKpis.vue'
import PurchaseKpis           from '@/components/purchases/PurchaseKpis.vue'
import FinancialKpis          from '@/components/finances/FinancialKpis.vue'
import TotalStockValue        from '@/components/inventory/TotalStockValue.vue'
export default {
  components: { 
    SalesKpis,
    PurchaseKpis,
    TotalStockValue,
    FinancialKpis
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
