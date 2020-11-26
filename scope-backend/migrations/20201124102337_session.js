
exports.up = function (knex) {
  return knex.schema.createTable('session', (table) => {
    // Create Id column of type uuid, primary key, not null, default to postgres generate uuid
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    // session table references a user and if that user is deleted so should this row
    table.uuid('userId').references('id').inTable('user').notNullable().onDelete('CASCADE');
    // useTz always store data in UTC Format
    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());

  })
};

exports.down = function (knex) {
  return knex.schema.dropTable('session');
};
