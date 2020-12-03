
exports.up = function (knex) {
  return knex.schema.createTable('user', (table) => {
    // Create Id column of type integer
    table.integer('id').notNullable().primary();
    table.string('name').notNullable().unique();
    table.string('businessName').notNullable();
    table.string('telephone').notNullable();
    table.string('fax').notNullable();
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
