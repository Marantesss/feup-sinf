<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <inventory-purchases-sales/>
      <sales-by-store/>
    </v-row>
    <v-row id='core-view-row'>
      <sales-by-store/>
      <purchases-sales-cashflow/>
    </v-row>
  </v-container>
</template>

<script>
import InventoryPurchasesSales from '@/components/overview/InventoryPurchasesSales.vue'
import SalesByStore from '@/components/overview/SalesByStore.vue'
import PurchasesSalesCashflow from '../components/overview/PurchasesSalesCashflow.vue'
export default {
  components: { 
    InventoryPurchasesSales, 
    SalesByStore,
    PurchasesSalesCashflow
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
