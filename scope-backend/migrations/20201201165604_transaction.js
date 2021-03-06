
exports.up = function (knex) {
  return knex.schema.createTable('transaction', (table) => {
    table.string('id').notNullable().primary();
    // reference to journal
    table.bigInteger('journalId').notNullable().references('id').inTable('journal').onDelete('CASCADE');

    table.integer('period').notNullable();
    table.date('date', { useTz: true }).notNullable();
    table.string('sourceId').notNullable();
    table.string('description').notNullable();
    table.integer('docArchivalNumber').notNullable();
    table.string('type').notNullable();
    table.string('GLPostingDate').notNullable();

    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('transaction');
};
