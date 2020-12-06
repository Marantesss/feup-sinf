<template>
  <v-container fluid class='grey lighten-5'>
    <v-row id='core-view-row'>
      <v-col md='6' class='full-height'>
        <v-row class='half-height'>
          <wide-line-chart-with-title :title="'Sales vs Cost Of Goods Sold'" />
        </v-row>
        <v-row class='half-height'>
          <financial-kpis />
        </v-row>
      </v-col>
      <v-col md='6' class='full-height single-element'>
        <v-row class='full-height'>
          <balance-sheet />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import WideLineChartWithTitle from '@/components/finances/WideLineChartWithTitle.vue'
import BalanceSheet           from '@/components/finances/BalanceSheet.vue'
import FinancialKpis          from '@/components/finances/FinancialKpis.vue'
export default {
  components: {
    WideLineChartWithTitle,
    FinancialKpis,
    BalanceSheet
  },
  name: 'Accounts',
  created: (() => { document.title = 'scope - Accounts' }),
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
