<template>
  <v-col class="full-height">
    <v-row no-gutters class="elevation-10 mx-1 main">
      <v-col class="pa-2">
        <span class="title"> Balance Sheet </span>
        <v-container class="table-container">
          <div class="table">
            <v-data-table
              dense
              :loading="loading"
              :headers="headers"
              :items="balanceSheetData"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="20"
              :footer-props="{
                fixed: true,
                showFirstLastPage: true,
              }"
            >
              <template v-slot:top>
                <v-text-field
                  v-model="search"
                  label="Search"
                  class="mx-4"
                ></v-text-field>
              </template>

              <template v-slot:item.balance="{ item }">
                <span v-if="item.total" class="font-weight-bold">
                  {{ formatCurrency(item.balance) }}
                </span>
                <span v-else>
                  {{ formatCurrency(item.balance)}}
                </span>
              </template>

              <template v-slot:item.name="{ item }">
                <span
                  v-if="item.total"
                  class="font-weight-bold text-uppercase"
                  v-text="item.name"
                >
                </span>
                <span v-else v-text="item.name"> </span>
              </template>

              <template v-slot:body.append>
                <v-space></v-space>
              </template>
            </v-data-table>
          </div>
        </v-container>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
import api from "@/services/api";

export default {
  name: "BalanceSheet",

  methods: {
    filterOnlyCapsText(value, search) {
      return (
        value != null &&
        search != null &&
        typeof value === "string" &&
        value
          .toString()
          .toLocaleUpperCase()
          .indexOf(search.toString().toLocaleUpperCase()) !== -1
      );
    },

    formatCurrency(amount) {
      let decimalCount = 2;
      const decimal = ".";
      const thousands = " ";
      const moneySign = "€ ";
      try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(
          (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
        ).toString();
        let j = i.length > 3 ? i.length % 3 : 0;

        return (
          moneySign +
          negativeSign +
          (j ? i.substr(0, j) + thousands : "") +
          i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
          (decimalCount
            ? decimal +
              Math.abs(amount - i)
                .toFixed(decimalCount)
                .slice(2)
            : "")
        );
      } catch (e) {
        console.log(e);
      }
    },
  },

  computed: {
    balanceSheetData: function () {
      if (this.loading) {
        return;
      }
      const data = [];

      // assets
      this.assets.nonCurrentAssets.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Total Non Current Assets",
        total: true,
        balance: this.assets.nonCurrentAssets.total,
      });
      this.assets.currentAssets.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Total Current Assets",
        total: true,
        balance: this.assets.currentAssets.total,
      });
      data.push({
        name: "Total Assets",
        total: true,
        balance: this.assets.total,
      });

      // liabilities
      this.liabilities.nonCurrentLiabilities.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Total Non Current Liabilities",
        total: true,
        balance: this.liabilities.nonCurrentLiabilities.total,
      });
      this.liabilities.nonCurrentLiabilities.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Total Current Liabilities",
        total: true,
        balance: this.liabilities.currentLiabilities.total,
      });
      data.push({
        name: "Total Liabilities",
        total: true,
        balance: this.liabilities.total,
      });

      // equity
      this.equity.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Total Equity",
        total: true,
        balance: this.equity.total,
      });

      console.log(data);

      return data;
    },
  },

  mounted() {
    api.getBalanceSheet(
      (res) => {
        if (res.data.status == 200) {
          this.equity = res.data.equity;
          this.assets = res.data.assets;
          this.liabilities = res.data.liabilities;
        }
        this.loading = false;
      },
      (err) => {
        console.log(`balance sheet error: ${err}`);
      }
    );
  },

  data: () => ({
    equity: [],
    assets: [],
    liabilities: [],
    loading: true,
    search: "",
    headers: [
      {
        text: "Name",
        align: "start",
        sortable: false,
        value: "name",
        width: "75%",
      },
      {
        text: "Balance",
        align: "end",
        sortable: true,
        value: "balance",
        width: "25%",
      },
    ],
    entries: [
      {
        account: "01",
        description: "Ah que bem",
        debit: "0.00",
        credit: "0.00",
      },
      {
        account: "01",
        description: "Bh que bem",
        debit: "0.00",
        credit: "0.00",
      },
      {
        account: "01",
        description: "Ch que bem",
        debit: "0.00",
        credit: "0.00",
      },
      {
        account: "01",
        description: "Dh que bem",
        debit: "0.00",
        credit: "0.00",
      },
      {
        account: "01",
        description: "Eh que bem",
        debit: "0.00",
        credit: "0.00",
      },
    ],
  }),
};
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