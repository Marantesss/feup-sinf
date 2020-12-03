
exports.up = function (knex) {
  return knex.schema.createTable('supplier', (table) => {
    //table with SAFT supplier details except adresses
    table.bigInteger('id').notNullable().primary();
    // reference to account
    table.integer('accountID').unsigned().notNullable().references('id').inTable('account').onDelete('CASCADE');

    // reference to address
    table.integer('billingAddress').unsigned().references('id').inTable('address').onDelete('SET NULL');
    table.integer('shipToAddress').unsigned().references('id').inTable('address').onDelete('SET NULL');

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

