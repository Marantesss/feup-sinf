<template>
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
                Supplier ID
              </div>
              <div class='kpi-big'>
                {{ main.id }}
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Contacts
              </div>
              <div class='kpi-list'>
                <span class='tinytext'>
                  {{ main.contacts.phone }}
                </span>
                <span class='tinytext'>
                  <a :href='"mailto:" + main.contacts.email'>{{ main.contacts.email }}</a>
                </span>
                <span class='tinytext'>
                  <a :href='main.contacts.website'>{{ main.contacts.website }}</a>
                </span>
              </div>
            </div>
          </v-col>
          <v-col class='right-half secondary-kpis-container'>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Address
              </div>
              <div class='kpi-list'>
                <span class='tinytext' v-for='(addLine, index) in main.address' :key='addLine'>
                  {{ addLine }}
                  <br v-if='index + 1 < main.address.length'>
                </span>
              </div>
            </div>
            <div class='secondary-kpi'>
              <div class='kpi-label'>
                Fiscal Number
              </div>
              <div class='kpi-big'>
                {{ main.fiscal }}
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
  name: 'ClientInfo',
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
  font-size: 1.5em;
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

.kpi-list {
  display: flex;
  position: absolute;
  top: 10%;
  left: 25%;
  flex-direction: column;
  justify-content: center;
  height: 90%;
  width: 75%;
}

.secondary-kpi > .kpi-big > .tinytext {
  font-size: 1em;
}

</style>
