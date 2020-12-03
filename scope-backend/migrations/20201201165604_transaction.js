
exports.up = function (knex) {
  return knex.schema.createTable('transaction', (table) => {
    table.string('id').notNullable().primary();
    // reference to journal
    table.integer('journalID').notNullable().references('id').inTable('journal');

    table.integer('period').notNullable();
    table.date('date', { useTz: true }).notNullable();
    table.string('sourceID').notNullable();
    table.string('description').notNullable();
    table.integer('docArchivalNumber').notNullable();
    table.string('type').notNullable();
    table.string('GLPostingDate').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('transaction');
};
