<template>
  <v-card class="mt-5" color="#18414a" elevation="0" tile>
    <v-row>
      <v-icon style="margin-right:-30px" class="ml-5" v-if="!picking">mdi-timelapse</v-icon>
      <v-col class="d-flex flex-column align-center">
        <v-text-field
        style="margin-bottom:-20px;"
        v-if="!picking"
        @click.stop="pickingFrom=true"
        v-model="dateFrom"
        label="From:"
        readonly
        ></v-text-field>
        <v-text-field
        style="margin-bottom:-10px"
        v-if="!picking"
        @click.stop="pickingTo=true;"
        v-model="dateTo"
        label="To:"
        readonly
        ></v-text-field>
        <v-date-picker
          type="month"
          v-model="dateFrom"
          v-if="pickingFrom"
          @change="pickingFrom=false"
          width=220
          header-color="secondary"
          color="secondary"
          light
          full-width:true
          :no-title="true"
          :max=dateTo
          :show-current="true"
        ></v-date-picker>
        <v-date-picker
          type="month"
          v-model="dateTo"
          v-if="pickingTo"
          @change="pickingTo=false"
          width=220
          header-color="secondary"
          color="secondary"
          light
          full-width:true
          :no-title="true"
          :min=dateFrom
          :max=now
          :show-current="true"
        ></v-date-picker>
      </v-col>    
      
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: "Datepicker",

  data: () => ({
    pickingFrom: false,
    dateFrom: "2020-10",
    pickingTo: false,
    dateTo: "2020-11",
  }),

  computed: {
    picking () {
      return this.pickingFrom || this.pickingTo;
    },

    now () {
      let date = new Date();
      let year = date.getFullYear().toString();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return year + "-" + month + "-" + day;
    }
  },
};
</script>

<style>
</style>