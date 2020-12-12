<template>
  <v-col class='full-height'>
    <v-row no-gutters class='elevation-10 mx-1 main'>
      <v-col class='pa-2'>
        <span class='title'>
          Balance Sheet
        </span>
        <v-container class='table-container'>
          <div class='table'>
            <v-data-table
              :headers='headers'
              :items='entries'
              :search='search'
              :custom-filter='filterOnlyCapsText'
              :items-per-page=12
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
              <template v-slot:item.debit='{ item }'>
                {{ '€ ' + item.debit }}
              </template>
              <template v-slot:item.credit='{ item }'>
                {{ '€ ' + item.credit }}
              </template>
              <template v-slot:body.append>
                <tr class='balance-sheet-total'>
                  <td
                    class='text-start'
                    style='width: 15%; min-width: 15%;'></td>
                  <td
                    class='text-start'
                    style='width: 45%; min-width: 45%;'><b>TOTAL</b></td>
                  <td
                    class='text-start'
                    style='width: 20%; min-width: 20%;'><b>{{ '€ ' + totalDebit }}</b></td>
                  <td
                    class='text-start'
                    style='width: 20%; min-width: 20%;'><b>{{ '€ ' + totalCredit }}</b></td>
                </tr>
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
  name: 'BalanceSheet',
  data() {
    return {
      totalDebit: '95,000.00',
      totalCredit: '100,000.00',
      search: '',
      headers: [
        {
          text: 'Account',
          align: 'start',
          sortable: true,
          value: 'account',
          width: '15%',
        },
        {
          text: 'Description',
          align: 'start',
          sortable: false,
          value: 'description',
          width: '45%',
        },
        {
          text: 'Debit',
          align: 'start',
          sortable: true,
          value: 'debit',
          width: '20%',
        },
        {
          text: 'Credit',
          align: 'start',
          sortable: true,
          value: 'credit',
          width: '20%',
        }
      ],
      entries: [
        {
          account: '01',
          description: 'Ah que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Bh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Ch que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Dh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Eh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Fh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Gh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Hh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Ih que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Jh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Kh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Lh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Mh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Nh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Oh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Ph que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Qh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Rh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Sh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Th que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Uh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Vh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Wh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Xh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Yh que bem',
          debit: '0.00',
          credit: '0.00'
        },
        {
          account: '01',
          description: 'Zh que bem',
          debit: '0.00',
          credit: '0.00'
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

.full-height {
  height: 100%;
}

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

.table-container {
  flex-grow: 1;
  .table {
    height: 100%;
    width: 100%;
  }
}

table {
  position: relative;
}

.balance-sheet-total {
  position: absolute;
  bottom: 0;
  display: flex;
  align-content: center;
  > td {
    display: flex;
    align-items: center;
  }
}

</style>

<style lang='scss'>

div.v-data-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  > div.v-input {
    flex-grow: 0;
  }
  > div.v-data-table__wrapper > table {
    height: 100%;
    > tbody {
      position: relative;
      > .balance-sheet-total {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
    }
  } 
  > div.v-data-footer {
    width: 100%;
    justify-content: center;
    align-self: flex-end;
  }
}

.v-data-table__wrapper {
  height: 100%;
}

div.v-data-table.theme--light {
  background-color: transparent;
}

div.v-data-footer__select {
  display: none;
}

</style>