<template>
  <v-container fluid class="grey lighten-5">
    <v-row id="core-view-row">
      <supplier-info :name="name" :main="main" />
      <supplier-sales :sales="sales" />
    </v-row>
    <v-row id="core-view-row">
      <wide-bar-chart-with-title :title="'Purchases Over Time'" />
    </v-row>
  </v-container>
</template>

<script>
import SupplierInfo from "@/components/drilldown/supplier/SupplierInfo.vue";
import SupplierSales from "@/components/drilldown/supplier/SupplierSales.vue";
import WideBarChartWithTitle from "@/components/generic/WideBarChartWithTitle.vue";
import api from "@/services/api";

export default {
  name: "Supplier",

  components: {
    SupplierInfo,
    SupplierSales,
    WideBarChartWithTitle,
  },

  created: () => {
    document.title = "scope - Supplier";
  },

  mounted() {
    const supplierId = this.$route.params.id;

    if (!supplierId) {
      this.$router.back();
    }

    api.getSupplier(
      supplierId,
      (res) => {
        if (res.status == 200) {
          this.name = res.data.supplierName;
          this.main.id = res.data.supplierKey;
          this.main.address.push(res.data.adress);
          this.main.contacts.email = res.data.email;
          this.main.fiscal = res.data.taxID;
        }
        console.log(res);
      },
      (err) => {
        console.log(`balance sheet error: ${err}`);
      }
    );
  },

  data() {
    return {
      name: "",
      main: {
        id: "",
        contacts: {
          phone: "",
          email: "",
          website: "",
        },
        address: [],
        fiscal: "",
      },
      sales: {
        totalPurchased: "0.00",
        avgCostPerOrder: "0.00",
        totalPurchaseOrders: "0",
        pendingPurchaseValues: "0.00",
        purchaseBacklog: "0.00",
      },
    };
  },
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
