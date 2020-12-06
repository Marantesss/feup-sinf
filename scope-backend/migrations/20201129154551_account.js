
exports.up = function (knex) {
  return knex.schema.createTable('account', (table) => {
    //table with all SAFT account details
    table.bigInteger('id').notNullable().primary();
    table.string('description').notNullable();
    table.float('openingDebitBalance', 6).notNullable();
    table.float('openingCreditBalance', 6).notNullable();
    table.float('closingDebitBalance', 6).notNullable();
    table.float('closingCreditBalance', 6).notNullable();
    table.string('groupingCategory').notNullable();

    // can be null
    table.integer('groupingCode');
    table.integer('taxonomyCode');

    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('account');
};
