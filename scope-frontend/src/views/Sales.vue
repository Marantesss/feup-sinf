<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <v-col md="6" class="full-height">
        <v-row class="half-height">
          <sales-kpis/>
        </v-row>
        <v-row class="half-height">
          <sales-over-time/>
        </v-row>
      </v-col>
      <v-col md="6" class="full-height">
        <v-row class="half-height">
          <sales-by-warehouse/>
        </v-row>
        <v-row class="half-height">
          <top-consumers/>
        </v-row>
      </v-col>  
    </v-row>
  </v-container>
</template>

<script>
import SalesKpis          from '@/components/sales-orders/SalesKpis.vue'
import SalesOverTime from '@/components/sales-orders/SalesOverTime.vue'
import SalesByWarehouse       from '@/components/sales-orders/SalesByWarehouse.vue'
import TopConsumers       from '@/components/sales-orders/TopConsumers.vue'
export default {
  components: {
    SalesKpis,
    SalesOverTime,
    SalesByWarehouse,
    TopConsumers
  },
  name: 'Sales',
  created: (() => { document.title = 'scope - Sales Orders' })
}
</script>

<style scoped>

div.container {
  height: 100%;
  padding: 0;
  padding-left: 10px;
}

div.container > .row#core-view-row {
  height: 100%;
  width: 100%;
}

.full-height.col {
  height: 100%;
  padding: 0;
}

.full-height.col.single-element {
  padding: 0 12px;
}

.full-height.row {
  padding: 12px;
  height: 100%;
}

.half-height {
  margin: 0;
  height: 50%;
}

</style>
