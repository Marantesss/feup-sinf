
exports.up = function(knex) {
  return knex.schema.createTable('session', (table) =>  {
        // Create Id column of type uuid, primary key, not null, default to postgres generate uuid
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        // Using user email to uniquely identify him
        table.string('email').notNullable().unique();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('session');
};
