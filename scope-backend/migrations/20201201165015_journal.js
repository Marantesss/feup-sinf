
exports.up = function (knex) {
  return knex.schema.createTable('journal', (table) => {
    table.integer('id').notNullable().primary();
    table.string('description').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('journal');
};
