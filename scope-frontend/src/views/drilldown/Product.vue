<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <product-info
        :name="name" 
        :main="main" />
      <product-sales 
        :sales="sales" />
    </v-row>
    <v-row id='core-view-row'>
      <line-chart-with-title :title="'Purchases vs Sales'" />
      <line-chart-with-title :title="'Product\'s Price Variation'" />
    </v-row>
  </v-container>
</template>

<script>
import ProductInfo            from '@/components/drilldown/product/ProductInfo.vue'
import ProductSales           from '@/components/drilldown/product/ProductSales.vue'
import LineChartWithTitle     from '@/components/generic/LineChartWithTitle.vue'
import api from '@/services/api'
export default {
  components: {
    ProductInfo,
    ProductSales,
    LineChartWithTitle
  },
  name: 'Product',
  created: (() => { document.title = 'scope - Product' }),
  data() {
    return {
      name: 'Porter Cable 3-Amp Oscillating',
      main: {
        id: 'P0001',
        upc: '00885911364355',
        cogs: '5432.10',
        suppliers: [
          'F0001',
          'F0003'
        ]
      },
      sales: {
        currentSellingPrice: '345.99',
        avgSellingPrice: '325.79',
        avgCost: '245.90',
        avgProfitMargin: '79.89',
        totalSold: '1234',
        totalInStock: '45'
      },
    }
  },
  mounted () {
    api.getProduct(1,(res)=>{
      console.log(res)
    })
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
