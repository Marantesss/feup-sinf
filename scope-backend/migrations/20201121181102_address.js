
exports.up = function (knex) {
  return knex.schema.createTable('address', (table) => {
    // Create Id column of type integer
    table.increments('id').notNullable().primary();

    // not mandatory
    table.string('buildingNumber');
    table.string('streetName');
    table.string('region');

    table.string('addressDetail').notNullable();
    table.string('city').notNullable();
    table.string('postalCode').notNullable();
    table.string('country').notNullable();

    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('address');
};
