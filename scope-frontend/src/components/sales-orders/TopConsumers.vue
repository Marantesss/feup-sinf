<template>
  <v-col md='6'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2 top-consumers'>
        <span class='title'>
          Top Consumers
        </span>
        <v-container class='table-container'>
          <div class='table'>
            <v-data-table
              :headers='headers'
              :items='entries'
              :search='search'
              :custom-filter='filterTextSearch'
              items-per-page='8'
              :footer-props='{
                fixed: true,
                showFirstLastPage: true,
              }'>
              <template v-slot:top>
                <v-text-field
                  v-model='search'
                  label='Search'
                  class='mx-4'
                ></v-text-field>
              </template>
              <template v-slot:item.totalspent='{ item }'>
                {{ '€ ' + item.totalspent }}
              </template>
              <template v-slot:body.append>
                <div class='space-filler'></div>
              </template>
            </v-data-table>    
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: 'Top Consumers',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Consumer',
          align: 'start',
          sortable: false,
          value: 'consumer',
          width: '45%',
        },
        {
          text: 'Total Spent',
          align: 'start',
          sortable: true,
          value: 'totalspent',
          width: '30%',
        },
        {
          text: 'Num Purchases',
          align: 'start',
          sortable: true,
          value: 'numpurchases',
          width: '25%',
        },
      ],
      entries: [
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
        {
          consumer: 'Consumidor M.',
          totalspent: '12,345.67',
          numpurchases: '8'
        },
      ]
    }
  },
  methods: {
    filterOnlyCapsText (value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(
          search.toString().toLocaleUpperCase()) !== -1
    },
  }
}
</script>

<style scoped lang='scss'>

.col {
  height: 100%;
  > .row {
    height: 100%;
    > .col {
      height: 100%;
    }
  }
}

.table-container {
  padding-top: 0;
  flex-grow: 1;
  .table {
    height: 100%;
    width: 100%;
  }
}

</style>

<style lang='scss'>

.top-consumers div.v-input {
  padding-top: 0;
}

.top-consumers div.v-data-table {
  > div.v-input {
    flex-grow: 0;
  }
  > div.v-data-footer {
    width: 100%;
    justify-content: center;
    align-self: flex-end;
  }
}

.top-consumers div.v-input__slot {
  margin: 0;
}

.top-consumers div.v-text-field__details {
  display: none;
}

.top-consumers div.v-data-table__wrapper {
  height: 280px;
  width: 100%;
  > table {
    height: 280px;
    width: 100%;
    .text-start {
      height: 31px !important;
      max-height: 31px !important;
    }
    td.text-start {
      font-size: 0.7em;
    }
    .space-filler {
      flex-grow: 1;
    }
  }
}

div.v-data-table.theme--light {
  background-color: transparent;
}

div.v-data-footer__select {
  display: none;
}

</style>