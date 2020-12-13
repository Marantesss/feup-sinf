<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Total Stock Value
          </div>
          <div class='kpi-big'>
            {{stockValue}}
          </div>
        </div>
        <div class='stock-per-store'>
          <span class='title'>
            Stock Per Warehouse
          </span>
          <div class='rest' />
          <chart-wrapper style='height: 270px;'
            :stackedX=true :stackedY=true />
        </div>
      </v-col>
    </v-row>
  </v-col>
  
</template>

<script>
import ChartWrapper from '@/components/common/ChartWrapper.vue'
import api from '@/services/api'


export default {
  components: { ChartWrapper },
  name: 'TotalStockValue',
  data: () => ({
    stockValue : 0
  }),
  mounted () {
    api.stockValue((res)=>{
     this.stockValue = res.data.stockValue;

    })
  }
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

.kpi-label {
  padding-left: 0.25em;
  font-weight: 300;
}

.kpi-big:before {
  content: "\20ac\00a0";
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
  font-weight: 700;
  font-size: 2.5em;
}

.stock-per-store {
  height: 298px;
}

</style>
