<template>
  <v-col>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2 top-consumers'>
        <span class='title'>
          All Consumers
        </span>
        <v-container class='table-container'>
          <div class='table'>
            <v-data-table
              :headers='headers'
              :items='entries'
              :search='search'
              :custom-filter='filterOnlyCapsText'
              :items-per-page=8
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
              <template v-slot:item.name='{ item }'>
                <router-link :to="item.route">
                  {{ item.name }}
                </router-link>
              </template>
              <template v-slot:item.totalspent='{ item }'>
                {{ '€ ' + item.adress }}
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
import api from '@/services/api'
export default {
  name: 'TopConsumers',
  data() {
    return {
      search: '',
      headers: [
        {
          text: 'Consumer',
          align: 'start',
          sortable: true,
          value: 'name',
          width: '50%',
        },
        {
          text: 'City',
          align: 'start',
          sortable: true,
          value: 'city',
          width: '30%',
        },
        {
          text: 'Taxpayer Number',
          align: 'start',
          sortable: true,
          value: 'taxID',
          width: '20%',
        },
      ],
      entries: []
    }
  },
  mounted () {
    api.costumers((res)=>{
      res.data.forEach(element => {
        element.route = '/client/' + element.customerKey
        element.name = element.name.length > 47 ? element.name.substring(0, 47-3) + '...' : element.name
      });
      this.entries = res.data;
    })
  },
  methods: {
    filterOnlyCapsText (value, search) {
      return value != null &&
        search != null &&
        typeof value === 'string' &&
        value.toString().toLocaleUpperCase().indexOf(
          search.toString().toLocaleUpperCase()) !== -1
    },
  },
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
  table {
    height: 280px;
    width: 100%;
    th.text-start {
      height: 32px;
    }
    td.text-start {
      height: 31px;
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