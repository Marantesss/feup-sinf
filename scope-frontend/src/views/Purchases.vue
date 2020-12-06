<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <purchase-kpis />
      <sales-by-product-category />
    </v-row>
    <v-row id='core-view-row'>
      <sales-by-product-category />
      <purchase-orders />
    </v-row>
  </v-container>
</template>

<script>
import PurchaseKpis           from '@/components/purchases/PurchaseKpis.vue'
import SalesByProductCategory from '@/components/generic/SalesByProductCategory.vue'
import PurchaseOrders         from '@/components/purchases/PurchaseOrders.vue'
export default {
  components: { 
    PurchaseKpis,
    SalesByProductCategory,
    PurchaseOrders
  },
  name: 'Purchases',
  created: (() => { document.title = 'scope - Purchases' }),
};
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
