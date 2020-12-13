<template>
  <v-col md="6">
    <v-row no-gutters class="elevation-10 mx-1 main">
      <v-col class="pa-2 top-consumers">
        <span class="title"> Purchase Orders </span>
        <v-container class="table-container">
          <div class="table">
            <v-data-table
              :headers="headers"
              :items="entries"
              :search="search"
              :custom-filter="filterOnlyCapsText"
              :items-per-page="8"
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
              <template v-slot:item.paid="{ item }">
                <v-icon v-if="item.paid" color="green">
                  mdi-check-circle-outline
                </v-icon>
                <v-icon v-else color="red"> mdi-close-circle-outline </v-icon>
              </template>
              <template v-slot:item.details="{ item }">
                <a :href="item.details" target="_blank"> DETAILS </a>
              </template>
              <template v-slot:body.append>
                <div class="space-filler"></div>
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
  name: "PurchaseOrders",
  data() {
    return {
      search: "",
      icons: {
        paid: "mdi-tick-circle-outline",
        unpaid: "mdi-highlight-off",
      },
      headers: [
        {
          text: "Number",
          align: "start",
          sortable: true,
          value: "number",
          width: "13%",
        },
        {
          text: "Date",
          align: "start",
          sortable: true,
          value: "date",
          width: "15%",
        },
        {
          text: "Vendor",
          align: "start",
          sortable: false,
          value: "vendor",
          width: "18%",
        },
        {
          text: "Total Products",
          align: "start",
          sortable: true,
          value: "numproducts",
          width: "19.5%",
        },
        {
          text: "Total",
          aligh: "start",
          sortable: true,
          value: "total",
          width: "12.5%",
        },
        {
          text: "Received",
          align: "start",
          sortable: true,
          value: "paid",
          width: "16%",
        },
        {
          text: "Details",
          align: "start",
          sortable: false,
          value: "details",
        },
      ],
      entries: [],
    };
  },
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
  },
  mounted() {
    api.purchases((res) => {
      res.data.forEach((element) => {
        const entry = {};
        (entry.number = element.purchaseID),
          (entry.date = element.date),
          (entry.vendor = element.supplierName),
          (entry.numproducts = element.quantity),
          (entry.total = element.totalValue),
          (entry.paid = element.received),
          (entry.details = "https://my.jasminsoftware.com/243057/243057-0001/#/purchases/orders/editstandardorder?id=" + element.purchaseID); //TODO
          this.entries.push(entry);
      });

    });
  },
};
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