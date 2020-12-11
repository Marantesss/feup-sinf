<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <purchase-kpis />
      <purchases-by-product />
    </v-row>
    <v-row id='core-view-row'>
      <purchases-by-supplier />
      <purchase-orders />
    </v-row>
  </v-container>
</template>

<script>
import PurchaseKpis           from '@/components/purchases/PurchaseKpis.vue'
import PurchasesByProduct     from '@/components/purchases/PurchasesByProduct.vue'
import PurchasesBySupplier    from '@/components/purchases/PurchasesBySupplier.vue'
import PurchaseOrders         from '@/components/purchases/PurchaseOrders.vue'
export default {
  components: { 
    PurchaseKpis,
    PurchasesByProduct,
    PurchasesBySupplier,
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
