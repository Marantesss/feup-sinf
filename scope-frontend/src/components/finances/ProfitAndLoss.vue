<template>
  <v-col>
    <v-row no-gutters class="elevation-10 mx-1 main">
      <v-col>
        <div class="px-2 d-flex align-center justify-space-between">
          <span class="title">Profit and Loss</span>
          <v-text-field
            style="width: 200px !important"
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </div>
        <v-container class="table-container">
          <div class="table">
            <v-data-table
              dense
              :loading="loading"
              :headers="headers"
              :items="incomeStatementData"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="7"
              :footer-props="{
                fixed: true,
                showFirstLastPage: true,
              }"
            >
              <template v-slot:item.balance="{ item }">
                <span v-if="item.total" class="font-weight-bold">
                  {{ formatCurrency(item.balance) }}
                </span>
                <span v-else>
                  {{ formatCurrency(item.balance) }}
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
                <v-spacer></v-spacer>
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
  name: "ProfitAndLoss",

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
    incomeStatementData: function () {
      if (this.loading) {
        return;
      }
      const data = [];

      // revenue
      this.revenue.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Receita Total",
        balance: this.revenue.total,
        total: true,
      });
      // expenses
      this.expenses.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Despesa Total",
        balance: this.expenses.total,
        total: true,
      });
      // depreciation
      this.depreciation.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Depreciação Total",
        balance: this.depreciation.total,
        total: true,
      });
      // interest
      this.interest.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Interesse Total",
        balance: this.interest.total,
        total: true,
      });
      // taxes
      this.taxes.entries.forEach((entry) => {
        data.push({
          ...entry,
        });
      });
      data.push({
        name: "Imposto Total",
        balance: this.taxes.total,
        total: true,
      });

      return data;
    },
  },

  mounted() {
    api.getProfitAndLoss(
      (res) => {
        if (res.data.status == 200) {
          this.revenue = res.data.revenue;
          this.expenses = res.data.expenses;
          this.depreciation = res.data.depreciation;
          this.interest = res.data.interest;
          this.taxes = res.data.taxes;
        }
        this.loading = false;
      },
      (err) => {
        console.log(`balance sheet error: ${err}`);
      }
    );
  },

  data: () => ({
    revenue: [],
    expenses: [],
    depreciation: [],
    interest: [],
    taxes: [],
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