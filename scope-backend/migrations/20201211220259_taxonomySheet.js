
exports.up = function(knex) {
  return knex.schema.createTable('taxonomySheet', (table) => {
    // balancete
    table.integer('id').notNullable().primary();
    // opening balance
    table.float('openingDebit', 6).notNullable().defaultTo(0);
    table.float('openingCredit', 6).notNullable().defaultTo(0);
    // balance from transactions
    table.float('debit', 6).notNullable().defaultTo(0);
    table.float('credit', 6).notNullable().defaultTo(0);

    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema
    .dropTable('taxonomySheet');
};
