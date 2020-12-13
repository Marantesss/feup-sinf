<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Total Purchased
          </div>
          <div class='kpi-big money'>
            {{ sales.totalPurchased }}
          </div>
        </div>
        <v-row class='secondary-kpis'>
          <v-col class='left-half secondary-kpis-container'>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Average Cost per Order
              </div>
              <div class='kpi-big money'>
                {{ sales.avgCostPerOrder }}
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Pending Purchase Values
              </div>
              <div class='kpi-big money'>
                {{ sales.pendingPurchaseValues }}
              </div>
            </div>
          </v-col>
          <v-col class='right-half secondary-kpis-container'>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Total Purchase Orders
              </div>
              <div class='kpi-big'>
                {{ sales.totalPurchaseOrders }}
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Purchase Backlog
              </div>
              <div class='kpi-big money'>
                {{ sales.purchaseBacklog }}
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'SupplierSales',
  props: [ 'sales' ],
}
</script>

<style scoped>

.main {
  height: 100%;
}

.main-kpi {
  position: relative;
  height: 25%;
  background-color: #ECECEC;
  border-radius: 10px;
  margin: 0.25em 0;
}

.secondary-kpis {
  display: flex;
  height: 75%;
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
  font-size: 2.5em;
}

.secondary-kpi .kpi-label {
  font-size: 1.35em;
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
  font-size: 2.5em;
}

.money::before {
  content: '\20ac\00a0';
}

</style>
