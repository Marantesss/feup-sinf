
exports.up = function (knex) {
  return knex.schema.createTable('supplier', (table) => {
    //table with SAFT supplier details except adresses
    table.integer('id').notNullable().primary();
    // reference to account
    table.integer('accountID').notNullable().references('id').inTable('account');

    // reference to address
    table.integer('billingAddress').references('id').inTable('address');
    table.integer('shipToAddress').references('id').inTable('address');

    table.integer('taxId').notNullable();
    table.string('companyName').notNullable();
    table.string('phone').notNullable();
    table.integer('selfBillingIndicator').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('supplier');
};

