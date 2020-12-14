<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <all-stock />
      <low-stock-items />
    </v-row>
    <v-row id='core-view-row'>
      <total-stock-value />
      <most-valuable-items />
    </v-row>
  </v-container>
</template>

<script>
import AllStock               from '@/components/inventory/AllStock.vue'
import LowStockItems          from '@/components/inventory/LowStockItems.vue'
import TotalStockValue        from '@/components/inventory/TotalStockValue.vue'
import MostValuableItems      from '@/components/inventory/MostValuableItems.vue'
export default {
  components: {
    AllStock,
    LowStockItems,
    TotalStockValue,
    MostValuableItems
  },
  name: 'Inventory',
  created: (() => { document.title = 'scope - Inventory' }),
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
