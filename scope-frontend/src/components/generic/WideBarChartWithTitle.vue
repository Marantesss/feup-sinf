<template>
  <v-col>
    <v-row class='elevation-10 mx-1'>
      <v-col class='pa-2'>
        <span class='title'>
          {{ title }}
        </span>
        <chart-wrapper style='height: 359px;' />
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import ChartWrapper from '@/components/common/ChartWrapper.vue'
export default {
  components: { ChartWrapper },
  name: 'Bar Chart with Title',
  props: ['title'],
  data: (() => { 
    return {
      title: this.title
    }
  }) 
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
