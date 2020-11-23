
exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    // Create Id column of type uuid, primary key, not null, default to postgres generate uuid
    table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
    // create email column
    table.string('email').notNullable().unique();
    // create passwword column
    table.string('password').notNullable();
    // create created at column
    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('user');
};
