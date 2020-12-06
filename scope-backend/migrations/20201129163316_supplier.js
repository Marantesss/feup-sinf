
exports.up = function (knex) {
  return knex.schema.createTable('supplier', (table) => {
    //table with SAFT supplier details except adresses
    table.string('id').notNullable().primary();
    // reference to account
    table.integer('accountId').unsigned().references('id').inTable('account').onDelete('CASCADE');

    // reference to address
    table.integer('billingAddress').unsigned().references('id').inTable('address').onDelete('SET NULL');
    table.integer('shipToAddress').unsigned().references('id').inTable('address').onDelete('SET NULL');

    table.string('taxId').notNullable();
    table.string('companyName').notNullable();
    table.integer('selfBillingIndicator').notNullable();
    table.string('phone');

    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('supplier');
};

