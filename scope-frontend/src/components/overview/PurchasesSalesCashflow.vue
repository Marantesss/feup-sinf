<template>
  <v-col md='6'>
    <v-row class='elevation-10 mx-1'>
      <v-col class='pa-2'>
        <span class='title'>
          Purchases and Sales Cashflow
        </span>
        <line-wrapper />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import LineWrapper from '@/components/common/LineWrapper.vue'
export default {
  components: { LineWrapper },
  name: 'Purchases and Sales Cashflow',
  data: (() => { return })  
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

</style>
