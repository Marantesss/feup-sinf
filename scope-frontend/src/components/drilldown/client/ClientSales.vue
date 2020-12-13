<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Total Sales Value
          </div>
          <div class='kpi-big'>
            <span v-text="formatCurrency(sales.totalSalesValue)"></span>
          </div>
        </div>
        <v-row class='secondary-kpis'>
          <v-col class='left-half secondary-kpis-container'>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Average Cost per Sale
              </div>
              <div class='kpi-big'>
                <span v-text="formatCurrency(sales.avgCostPerSale)"></span>
              </div>
            </div>
          </v-col>
          <v-col class='right-half secondary-kpis-container'>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Total Sales
              </div>
              <div class='kpi-big'>
                {{ sales.totalSales }}
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
  name: 'ClientSales',
  mixins: [currencyFormatter],
  props: [ 'sales' ],
}
</script>

<style scoped>

.main {
  height: 100%;
}

.main-kpi {
  position: relative;
  height: 45%;
  background-color: #ECECEC;
  border-radius: 10px;
  margin: 0.25em 0;
}

.secondary-kpis {
  display: flex;
  height: 55%;
  padding: 0.5em 12px;
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

.secondary-kpis-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}

.secondary-kpi {
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

.main-kpi .kpi-label {
  font-size: 2em;
  padding: 5px 10px;
}

.main-kpi .kpi-big {
  position: absolute;
  display: flex;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-size: 4em;
}

.secondary-kpi .kpi-label {
  font-size: 1.75em;
  padding: 5px 10px;
}

.secondary-kpi .kpi-big {
  position: absolute;
  display: flex;
  top: 10%;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
  font-size: 3.5em;
}

</style>
