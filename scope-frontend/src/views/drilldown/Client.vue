<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <client-info
        :name='name'
        :main='main' />
      <client-sales 
        :sales="sales" />
    </v-row>
    <v-row id='core-view-row'>
      <line-chart-with-title :title="'Purchases vs Sales'" />
      <line-chart-with-title :title="'Product\'s Price Variation'" />
    </v-row>
  </v-container>
</template>

<script>
import ClientInfo           from '@/components/drilldown/client/ClientInfo.vue';
import ClientSales          from '@/components/drilldown/client/ClientSales.vue'
import LineChartWithTitle     from '@/components/generic/LineChartWithTitle.vue'
export default {
  components: {
    ClientInfo,
    ClientSales,
    LineChartWithTitle
  },
  name: 'Client',
  created: (() => { document.title = 'scope - Client' }),
  data() {
    return {
      name: 'Powertool Solutions',
      main: {
        id: 'C0001',
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
        totalSalesValue: '345.99',
        avgCostPerSale: '12.90',
        totalSales: '79'
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
