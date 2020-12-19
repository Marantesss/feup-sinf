<template>
  <v-container fluid class="grey lighten-5">
    <v-row id="core-view-row">
      <product-info :name="name" :main="main" />
      <product-sales :sales="sales" />
    </v-row>
    <v-row id="core-view-row">
      <line-chart-with-title :title="'Purchases vs Sales'" />
      <line-chart-with-title :title="'Product\'s Price Variation'" />
    </v-row>
  </v-container>
</template>

<script>
import ProductInfo from "@/components/drilldown/product/ProductInfo.vue";
import ProductSales from "@/components/drilldown/product/ProductSales.vue";
import LineChartWithTitle from "@/components/generic/LineChartWithTitle.vue";
import api from "@/services/api";

export default {
  name: "Product",

  components: {
    ProductInfo,
    ProductSales,
    LineChartWithTitle,
  },

  created: () => {
    document.title = "scope - Product";
  },

  mounted() {
    const productId = this.$route.params.id;

    if (!productId) {
      this.$router.back();
    }

    api.getProduct(
      productId,
      (res) => {
        if (res.status == 200) {
          this.name = res.data.product;
          this.main.id = res.data.productKey;

          let sum = 0;
          let size = res.data.costOfGoods.length;
          for (const cog of res.data.costOfGoods) {
            console.log(cog);
            if (cog === 0) {
              size -= 1;
            } else {
              sum += cog;
            }
          }
          this.main.cogs = sum / size;
          // yep
          this.main.upc = 14748790;
          this.main.suppliers.push({
            name: "LEROY MERLIN PORTUGAL - SOCIEDADE DE BRICOLAGE, S.A. ",
            id: "0001",
          });
          this.sales = {
            currentSellingPrice: 134.99,
            avgSellingPrice: 134.99,
            avgCost: this.main.cogs,
            avgProfitMargin: "77.7%",
            totalSold: 3,
            totalInStock: 8,
          };
        }
        console.log(res.data);
      },
      (err) => {
        console.log(`balance sheet error: ${err}`);
      }
    );
  },

  data: () => ({
    name: "",
    main: {
      id: "",
      upc: "0",
      cogs: "00.0",
      suppliers: [],
    },
    sales: {
      currentSellingPrice: "00.00",
      avgSellingPrice: "00.00",
      avgCost: "00.00",
      avgProfitMargin: "0",
      totalSold: "0",
      totalInStock: "0",
    },
  }),
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
