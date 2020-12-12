<template>
  <div id='simple-table' class='simple-table'>
    <div class='header-tab'>
      <span id="simple-table-title" class='py-2 pl-2'>{{data.title}}</span>
    </div>
    <v-data-table
      :headers=data.headers
      :items=data.values
      items-per-page='10'
      :footer-props='{
        showFirstLastPage: true,
      }'>
      <template v-slot:item.value='{ item }'>
        <a href='item.route' v-if='item.route != undefined'>
          {{ item.value }}
        </a>
        <span v-else>
          {{ item.value }}
        </span>
      </template>
      <template v-slot:body.append>
        <div class='space-filler'>
        </div>
      </template>
    </v-data-table>    
  </div>
</template>

<script>
export default {
  name: "SimpleTable",
  props: ['data'],
}
</script>

<style>

/* Table */
#simple-table {
  height: 100%;
  border-left: 1px solid #969696;
}

/* Table Title Container */
#simple-table > div.header-tab {
  display: flex;
  align-items: center;
}

/* Table Title Text */
#simple-table > div.header-tab > span#simple-table-title {
  font-size: 1em;
}

#simple-table .v-data-table__wrapper {
  height: 330px;
}

#simple-table th {
  height: 30px;
}

/* Table Content */
#simple-table .v-data-table {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  border-top: 1px solid #969696;
}

/* Table Footer */
#simple-table .v-data-footer {
  display: flex;
  flex-grow: 0;
  border-top: 1px solid #969696;
  padding-left: 16px;
  padding-right: 16px;
  align-items: center;
  justify-content: space-between;
}

/* Pagination text */
.v-application--is-ltr #simple-table .v-data-footer__pagination {
  margin: 0;
  font-size: 0.75em;
}

/* Button to go to previous page (this places it before the text) */
.v-application--is-ltr #simple-table .v-data-footer__icons-before {
    order: -1;
}

/* Selector for items per page */
#simple-table div.v-data-footer__select {
  display: none;
}

/* Table rows */
#simple-table .v-data-table > .v-data-table__wrapper > table > tbody > tr > td.text-start {
  height: 30px;
  font-size: 0.7em;
}

/* Table pagination buttons */
.v-application--is-ltr #simple-table .v-data-footer .v-btn {
  width: 20px;
  margin: 0;
}

.space-filler {
  flex-grow: 1;
}

</style>
