a<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <div class='main-kpi'>
          <div class='kpi-label'>
            Name
          </div>
          <div class='kpi-big'>
            {{ name }}
          </div>
        </div>
        <v-row class='secondary-kpis'>
          <v-col class='left-half secondary-kpis-container'>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Product ID
              </div>
              <div class='kpi-big'>
                {{ main.id }}
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Cost of Goods Sold
              </div>
              <div class='kpi-big'>
                {{ main.cogs }}
              </div>
            </div>
          </v-col>
          <v-col class='right-half secondary-kpis-container'>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                UPC
              </div>
              <div class='kpi-big'>
                {{ main.upc }}
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Suppliers
              </div>
              <div class='kpi-big'>
                <span v-for='(s, index) in main.suppliers' :key='s'>
                  <a href="/supplier">{{ s }}</a>
                  <span v-if='index+1 < main.suppliers.length'>,&nbsp;</span>
                </span>
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
  name: 'Product Info',
  props: [ 'name', 'main' ],
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
}

.right-half {
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
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
  font-size: 2.5em;
}

.secondary-kpi .kpi-label {
  font-size: 1.35em;
  padding: 5px 10px;
}

.secondary-kpi .kpi-big {
  position: absolute;
  display: flex;
  top: 10%;
  left: 0;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
  font-size: 2em;
}

.suppliers {
  display: block;
  justify-content: center;
  align-items: center;
  height: 90%;
  width: 100%;
  font-size: 2em;
}

</style>
