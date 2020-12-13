<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <span class='title'>
          Purchase KPIs
        </span>
        <v-container class='kpi-container'>
          <v-row class='kpi-row top'>
            <v-col class='kpi left'>
              <div class='kpi-title'>
                Total Purchases
              </div>
              <div class='kpi-value'>
                <span v-text="formatCurrency(totalPurchases)"></span>
              </div>
            </v-col>
            <v-col class='kpi right'>
              <div class='kpi-title'>
                Total Purchase Orders
              </div>
              <div class='kpi-value'>
                <span>{{totalPurchaseOrders}}</span>
              </div>
            </v-col>
          </v-row>
          <v-row class='kpi-row bottom'>
            <v-col class='kpi left'>
              <div class='kpi-title'>
                Purchase Backlog
              </div>
              <div class='kpi-value'>
                <span v-text="formatCurrency(purchaseBacklog)"></span>
              </div>
            </v-col>
            <v-col class='kpi right'>
              <div class='kpi-title'>
                Purchase Orders Backlog
              </div>
              <div class='kpi-value'>
                <span>{{purchaseOrderBacklog}}</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-col>
  
</template>

<script>
import api from '@/services/api';
import currencyFormatter from "@/mixins/currencyFormatter";

export default {
  name: 'PurchaseKPIs',
  mixins: [currencyFormatter],
  data: () =>({
    purchaseOrderBacklog: "-",
    purchaseBacklog: "-",
    totalPurchaseOrders: "-",
    totalPurchases: "-"
  }),

  mounted() {
    api.purchases((res)=>{
      this.totalPurchaseOrders = res.data.length

      this.totalPurchases = res.data.reduce((accumulator,currValue)=>{
        accumulator+= currValue.totalValue;
        return accumulator;
      },0);

      const obj = {purchaseOrderBacklog: 0, purchaseBacklog:0}

      res.data.forEach(element => {
        if(!element.received){
        obj.purchaseOrderBacklog += 1;
        obj.purchaseBacklog +=  element.totalValue;
        }
      });
      this.purchaseOrderBacklog = obj.purchaseOrderBacklog;
      this.purchaseBacklog = obj.purchaseBacklog;

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

.kpi-container {
  padding: 1em;
  flex-grow: 1;
  > .kpi-row {
    height: 50%;
    > .kpi {
      position: relative;
      background-color: #ECECEC;
      flex-grow: 1;
      border-radius: 5%;
      > .kpi-title {
        font-weight: 300;
        font-size: 1.5em;
      }
      > .kpi-value {
        position: absolute;
        display: flex;
        top: 15%;
        left: 0;
        height: 85%;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 2.5em;
      }
    }
    > .left {
      margin-right: 0.5em;
    }
    > .right {
      margin-left: 0.5em;
    }
  }
  > .top {
    margin-bottom: 1em;
  }
  > .bottom {
    margin-top: 1em;
  }
}

</style>
