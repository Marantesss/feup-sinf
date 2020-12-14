<template>
  <v-container fluid class="grey lighten-5">
    <v-row id="core-view-row">
      <client-info :name="name" :main="main" />
      <client-sales :sales="sales" />
    </v-row>
    <v-row id="core-view-row">
      <wide-bar-chart-with-title :title="'Purchases Over Time'" />
    </v-row>
  </v-container>
</template>

<script>
import ClientInfo from "@/components/drilldown/client/ClientInfo.vue";
import ClientSales from "@/components/drilldown/client/ClientSales.vue";
import WideBarChartWithTitle from "@/components/generic/WideBarChartWithTitle.vue";
import api from "@/services/api";

export default {
  name: "Client",
  
  components: {
    ClientInfo,
    ClientSales,
    WideBarChartWithTitle,
  },

  created: () => {
    document.title = "scope - Client";
  },

  mounted() {
    const clientId = this.$route.params.id;

    if (!clientId) {
      this.$router.back();
    }

    api.getCostumer(
      clientId,
      (res) => {
        if (res.status == 200) {
          this.name = res.data.name;
          this.main.id = res.data.customerKey;
          this.main.contacts.website = res.data.website;
          this.main.fiscal = res.data.taxID;
          this.main.address.push(res.data.address);
          this.main.address.push(res.data.city);
          this.main.address.push(res.data.country);
        }
        console.log(res.data);
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
        totalSalesValue: "0",
        avgCostPerSale: "0",
        totalSales: "0",
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
