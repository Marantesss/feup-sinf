
exports.up = function (knex) {
  return knex.schema.createTable('journal', (table) => {
    table.bigInteger('id').notNullable().primary();
    table.string('description').notNullable();

    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('journal');
};
