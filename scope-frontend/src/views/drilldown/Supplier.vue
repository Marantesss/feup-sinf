<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <supplier-info
        :name='name'
        :main='main' />
      <supplier-sales 
        :sales="sales" />
    </v-row>
    <v-row id='core-view-row'>
      <wide-bar-chart-with-title :title="'Purchases Over Time'" />
    </v-row>
  </v-container>
</template>

<script>
import SupplierInfo           from '@/components/drilldown/supplier/SupplierInfo.vue';
import SupplierSales          from '@/components/drilldown/supplier/SupplierSales.vue'
import WideBarChartWithTitle  from '@/components/generic/WideBarChartWithTitle.vue'
export default {
  components: {
    SupplierInfo,
    SupplierSales,
    WideBarChartWithTitle
  },
  name: 'Supplier',
  created: (() => { document.title = 'scope - Supplier' }),
  data() {
    return {
      name: 'Heavy Machines, SA',
      main: {
        id: 'S0001',
        contacts: {
          phone: '229 876 194',
          email: 'heavy@machines.com',
          website: 'www.heavymachines.com'
        },
        address: [
          'Avenida Conde Ferreira, 350',
          '4400-345, Maia',
          'Portugal'
        ],
        fiscal: '21873893217'
      },
      sales: {
        totalPurchased: '345.99',
        avgCostPerOrder: '12.90',
        totalPurchaseOrders: '79',
        pendingPurchaseValues: '29.89',
        purchaseBacklog: '79.89'
      }
    }
  }
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
