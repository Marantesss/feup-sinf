<template>
  <v-col>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Total Net Sales
          </div>
          <div class='kpi-big'>
            <span v-text="formatCurrency(netSales)"></span>
          </div>
        </div>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Total Cost of Good Solds
          </div>
          <div class='kpi-big'>
            <span v-text="formatCurrency(cogs)"></span>
          </div>
        </div>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Gross Profit Margin
          </div>
          <div class='kpi-big percentage'>
            {{grossProfitMargin}}
          </div>
        </div>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import api from '@/services/api'
import currencyFormatter from "@/mixins/currencyFormatter";

export default {
  name: 'SalesKPIs',
  mixins: [currencyFormatter],
  data: () => ({
    netSales : "-",
    cogs: "-",
    grossProfitMargin: "-"
  }),
  mounted () {
    api.grossProfitMargin((res)=>{
      this.netSales = res.data.netSales;
      this.cogs = res.data.cogs;
      this.grossProfitMargin = res.data.grossProfitMargin;
    })
  }
}
</script>

<style scoped lang='scss'>

.col {
  height: 100%;
  > .row {
    height: 100%;
    > .col {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
}

.main-kpi {
  position: relative;
  height: 32%;
  background-color: #ECECEC;
  border-radius: 10px;
  margin: 0.25em 0;
}

.kpi-label {
  padding-left: 0.25em;
  font-weight: 300;
}

.percentage::before {
  content: "\0025\00a0";
}

.main-kpi .kpi-label {
  font-size: 2em;
  padding: 5px 10px;
}

.main-kpi .kpi-big {
  position: absolute;
  display: flex;
  top: 10%;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  font-weight: 700;
  font-size: 2.5em;
}

</style>
