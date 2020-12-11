<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Total Net Sales
          </div>
          <div class='kpi-big'>
            12,345.67
          </div>
        </div>
        <v-row class='secondary-kpis'>
          <v-col class='left-half secondary-kpis-container'>
            <div class='store-label'>
              Online Shop
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Revenue from Sales
              </div>
              <div class='kpi-big'>
                12,345.67
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Cost of Goods Sold
              </div>
              <div class='kpi-big'>
                5,432.10
              </div>
            </div>
          </v-col>
          <v-col class='right-half secondary-kpis-container'>
            <div class='store-label'>
              Physical Shops
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Revenue from Sales
              </div>
              <div class='kpi-big'>
                12,345.67
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Cost of Goods Sold
              </div>
              <div class='kpi-big'>
                5,432.10
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'Sales KPIs',
  data: () => ({})
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

.secondary-kpis {
  display: flex;
  height: 75%;
  padding: 0.5em 12px;
}

.left-half {
  padding-left: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-right: 1px solid #969696;
}

.right-half {
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
  border-left: 1px solid #969696;
}

.secondary-kpis-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  height: 100%;
}

.secondary-kpi {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  margin: 0.25em 0;
  background-color: #ECECEC;
  border-radius: 10px;
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

.secondary-kpis .store-label {
  font-weight: 300;
  font-size: 2em;
}

.secondary-kpi .kpi-label {
  font-size: 1.35em;
  padding: 5px 10px;
}

.secondary-kpi .kpi-big {
  display: flex;
  justify-content: center;
  width: 100%;
  font-size: 2em;
}

</style>
