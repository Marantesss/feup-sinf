<template>
  <v-col md="6">
    <v-row no-gutters class="elevation-10 mx-1">
      <v-col md="8" class="left-col pa-2">
        <span class="title">
          Purchases By Product
        </span>
        <div class="charts d-flex justify-center align-center">
          <div class="hard-coded-height">
            <doughnut-wrapper style="height: 300px" />
          </div>
        </div>
      </v-col>
      <v-col md="4" class="card-table">
        <simple-table :data="purchases" />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import SimpleTable from "@/components/tables/SimpleTable";
import DoughnutWrapper from "@/components//purchases/PurchasesByProductDoughnut";
import api from "@/services/api";
export default {
  components: { SimpleTable, DoughnutWrapper},
  name: "PurchasesByProduct",
  data: () => {
    return {
      purchases: {
        title: "All-Time Purchases",
        headers: [
          {
            text: "Product",
            align: "start",
            sortable: false,
            value: "name",
          },
          { text: "Purchases", value: "value" },
        ],
        values: [],
      },
    };
  },

  mounted() {
    api.getPurchasesbyProduct((res)=>{
      this.purchases.values = []
      res.data.map((element)=>{
        this.purchases.values.push({
          name: element.description,
          value: element.value,
          route: "/product/" + element.id,
        })
      })
    })
  },
};
</script>

<style scoped lang='scss'>
.col {
  height: 100%;
  > .row {
    height: 100%;
    > .col.left-col {
      height: 100%;
      display: flex;
      flex-direction: column;
      > div.charts {
        flex-grow: 1;
      }
    }
  }
}
</style>
