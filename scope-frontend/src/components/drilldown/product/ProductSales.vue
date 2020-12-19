<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <v-row class='kpis'>
          <v-col class='left-half kpis-container'>
            <div class='kpi'>
              <div class='kpi-label'>
                Current Selling Price
              </div>
              <div class='kpi-big'>
                <span v-text="formatCurrency(sales.currentSellingPrice)"></span>
              </div>
            </div>
            <div class='kpi'>
              <div class='kpi-label'>
                Average Cost
              </div>
              <div class='kpi-big'>
                <span v-text="formatCurrency(sales.avgCost)"></span>
              </div>
            </div>
            <div class='kpi'>
              <div class='kpi-label'>
                Total Sold
              </div>
              <div class='kpi-big'>
                {{ sales.totalSold }}
              </div>
            </div>
          </v-col>
          <v-col class='right-half kpis-container'>
            <div class='kpi'>
              <div class='kpi-label'>
                Average Selling Price
              </div>
              <div class='kpi-big'>
                <span v-text="formatCurrency(sales.avgSellingPrice)"></span>
              </div>
            </div>
            <div class='kpi'>
              <div class='kpi-label'>
                Average Profit Margin
              </div>
              <div class='kpi-big'>
                <span v-text="sales.avgProfitMargin"></span>
              </div>
            </div>
            <div class='kpi'>
              <div class='kpi-label'>
                Total In Stock
              </div>
              <div class='kpi-big'>
                {{ sales.totalInStock }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import currencyFormatter from "@/mixins/currencyFormatter";
export default {
  name: 'ProductSales',
  mixins: [currencyFormatter],
  props: [ 'sales' ],
}
</script>

<style scoped>

.main {
  height: 100%;
}

.kpis {
  display: flex;
  height: 100%;
  padding: 0 1em;
}

.left-half {
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.right-half {
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
}

.kpis-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}

.kpi {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  margin: 0.25em 0;
  background-color: #ECECEC;
  border-radius: 10px;
}

.kpi-label {
  padding-left: 0.25em;
  font-weight: 300;
}

.kpi-big {
  position: absolute;
  display: flex;
  top: 10%;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
  font-size: 2.5em;
}

.kpi .kpi-label {
  font-size: 1.35em;
  padding: 5px 10px;
}

</style>
