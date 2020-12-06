
exports.up = function (knex) {
  return knex.schema.createTable('session', (table) => {
    // Create Id column of type uuid, primary key, not null, default to postgres generate uuid
    table.increments('id').notNullable().primary();
    // session table references a user and if that user is deleted so should this row
    table.integer('userId').unsigned().notNullable().references('id').inTable('user').onDelete('CASCADE');
    // useTz always store data in UTC Format
    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());

  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('session');
};
