<template>
  <div id='simple-table' class='simple-table pt-2'>
    <div class='pb-1'>
      <span id="simple-table-title" class='pl-2'>Top Sales All-Time</span>
    </div>
    <v-data-table
      :headers='headers'
      :items='sales'
      items-per-page='10'
      hide-default-header='true'
      :footer-props='{
        showFirstLastPage: true,
      }'>
      <template v-slot:item.sales='{ item }'>
        <v-simple>
        {{ item.sales + 'M €' }}
        </v-simple>
      </template>
    </v-data-table>    
  </div>
</template>

<script>
export default {
  name: "SimpleTable",

  data: (() => {
    return {
      headers: [
        {
          text: 'Top Sales All-Time',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { text: 'Sales', value: 'sales' },
      ],
      sales: [
        {
          name: 'Store 1',
          sales: '340.1',
        },
        {
          name: 'Store 2',
          sales: '341.1',
        },
        {
          name: 'Store 3',
          sales: '342.1',
        },
        {
          name: 'Store 4',
          sales: '343.1',
        },
        {
          name: 'Store 5',
          sales: '344.1',
        },
        {
          name: 'Store 6',
          sales: '339.1',
        },
        {
          name: 'Store 7',
          sales: '338.1',
        },
        {
          name: 'Store 8',
          sales: '337.1',
        },
        {
          name: 'Store 9',
          sales: '336.1',
        },
        {
          name: 'Store 10',
          sales: '335.1',
        },
      ]
    }
  })
}
</script>

<style>

#simple-table #simple-table-title {
  font-size: 1em;
}

#simple-table .v-data-table {
  border-top: 1px solid #969696;
}

#simple-table .v-data-footer {
  border-top: 1px solid #969696;
  padding-left: 16px;
  padding-right: 16px;
  align-content: center;
  justify-content: space-between;
}

.v-application--is-ltr #simple-table .v-data-footer__pagination {
  margin: 0;
  font-size: 0.75em;
}

.v-application--is-ltr #simple-table .v-data-footer__icons-before {
    order: -1;
}

#simple-table div.v-data-footer__select {
  display: none;
  flex: 1;
}

#simple-table .v-data-table > .v-data-table__wrapper > table > tbody > tr > td.text-start {
  height: 30px;
  font-size: 0.7em;
}

#simple-table .v-data-table > .v-data-table__wrapper > table > thead > tr > th span {
  font-size: 1em;
  height: 40px;
}

.v-application--is-ltr #simple-table .v-data-footer .v-btn {
  width: 20px;
  margin: 0;
}

</style>
