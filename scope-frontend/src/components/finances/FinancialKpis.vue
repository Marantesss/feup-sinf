<template>
  <v-col>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <span class='title'>
          Financal KPIs
        </span>
        <v-container class='kpi-container'>
          <v-row class='kpi-row top'>
            <v-col class='kpi left'>
              <div class='kpi-title'>
                EBIT
              </div>
              <div class='kpi-value'>
                <span>12,345.67</span>
              </div>
            </v-col>
            <v-col class='kpi right'>
              <div class='kpi-title'>
                EBIT-DA
              </div>
              <div class='kpi-value'>
                <span>12,345.67</span>
              </div>
            </v-col>
          </v-row>
          <v-row class='kpi-row bottom'>
            <v-col class='kpi left'>
              <div class='kpi-title'>
                Accounts Receivable
              </div>
              <div class='kpi-value'>
                <span>12,345.67</span>
              </div>
            </v-col>
            <v-col class='kpi right'>
              <div class='kpi-title'>
                Accounts Payable
              </div>
              <div class='kpi-value'>
                <span>12,345.67</span>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'Financial KPIs',
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

.kpi-container {
  padding: 1em;
  flex-grow: 1;
  > .kpi-row {
    height: 50%;
    > .kpi {
      position: relative;
      background-color: #ECECEC;
      flex-grow: 1;
      border-radius: 5%;
      > .kpi-title {
        font-weight: 300;
        font-size: 1.5em;
      }
      > .kpi-value {
        position: absolute;
        display: flex;
        top: 15%;
        left: 0;
        height: 85%;
        width: 100%;
        justify-content: center;
        align-items: center;
        font-weight: 600;
        font-size: 2.5em;
        > span::before {
          content: "\20ac\00a0";
        }
      }
    }
    > .left {
      margin-right: 0.5em;
    }
    > .right {
      margin-left: 0.5em;
    }
  }
  > .top {
    margin-bottom: 1em;
  }
  > .bottom {
    margin-top: 1em;
  }
}

</style>
