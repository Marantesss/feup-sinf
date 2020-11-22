<template>
  <v-col>
    <v-row class="d-flex justify-center">
      <v-icon class="mb-2">mdi-calendar</v-icon>
    </v-row>    
    <v-text-field
    v-if="!picking"
    @click.stop="pickingFrom=true"
    v-model="dateFrom"
    label="From"
    readonly
    ></v-text-field>
    <v-text-field
    v-if="!picking"
    @click.stop="pickingTo=true;"
    v-model="dateTo"
    label="To"
    readonly
    ></v-text-field>
    <v-date-picker
      v-model="dateFrom"
      v-if="pickingFrom"
      @change="pickingFrom=false"
      width=260
      header-color="secondary"
      color="secondary"
      light
      full-width:true
      :no-title="true"
      :max=dateTo
      :show-current="true"
    ></v-date-picker>
    <v-date-picker
      v-model="dateTo"
      v-if="pickingTo"
      @change="pickingTo=false"
      width=260
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
</template>

<script>
export default {
  name: "Datepicker",

  data: () => ({
    pickingFrom: false,
    dateFrom: "2020-11-01",
    pickingTo: false,
    dateTo: "2020-11-10",
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