<template>
  <v-card class="mt-5" color="#18414a" elevation="0" tile>
    <v-col class="d-flex justify-space-between align-center">
      <v-icon class="">mdi-timelapse</v-icon>
      <v-carousel height="50" hide-delimiters show-arrows-on-hover :continuous=false>
        <v-carousel-item
          v-for="year in years" :key="year"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <div class="d-flex align-center">
              {{ year }}
            </div>
          </v-row>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-card>
</template>

<script>
export default {
  name: "Datepicker",

  data: () => ({
    years: [
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
    ],
  }),
};
</script>

<style>
</style>