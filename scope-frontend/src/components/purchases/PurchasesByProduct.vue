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
        title: "All Products",
        headers: [
          {
            text: "Product",
            align: "start",
            sortable: true,
            value: "name",
            width: '57.5%'
          },
          { text: "Purchases", value: "value" },
        ],
        values: [],
      },
    };
  },

  mounted() {
    api.getPurchasesByProduct((res)=>{
      res.data.forEach(element => {
        const key = element.description;
        let totalValue = this.purchases.values.find(x => x.description === key);
        if (totalValue === undefined) {
          element.name = key.length > 20 ? key.substr(0,20-4) +'...' : key,
          element.route = '/product/' + element.id;
          this.purchases.values.push(element);
        } else {
          totalValue.value += element.value;
        }
      });
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
