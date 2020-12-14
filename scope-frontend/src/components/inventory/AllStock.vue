<template>
  <v-col md="6">
    <v-row no-gutters class="elevation-10 mx-1 main">
      <v-col class="pa-2 top-consumers">
        <span class="title"> All Stock </span>
        <v-container class="table-container">
          <div class="table">
            <v-data-table
              :headers="headers"
              :items="entries"
              :search="search"
              :items-per-page="5"
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
              <template v-slot:item.name="{ item }">
                <router-link :to="item.route">
                  {{ item.name }}
                </router-link>
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
  components: {
  },
  name: 'AllStock',
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
          value: "number"
        },
        {
          text: "Name",
          align: "start",
          sortable: true,
          value: "name"
        },
        {
          text: "Unit",
          align: "start",
          sortable: true,
          value: "baseUnitDescription"
        },
        {
          text: "Stock",
          align: "start",
          sortable: true,
          value: "stock"
        },
      ],
      entries: [],
    };
  },

  mounted () {
    api.getInventory((res)=>{
      res.data.materialItems.map((element)=>{
        this.entries.push({
          number: element.itemKey,          
          name: element.description.length > 40 ? element.description.substr(0,40-1) +'...' : element.description,
          baseUnitDescription: element.baseUnitDescription,
          stock: element.warehouses.reduce((accumulator,currValue)=>{accumulator+=currValue.stock; return accumulator},0),
          route: '/product/' + element.itemKey,
        })
      })
    })
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
