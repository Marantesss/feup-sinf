
exports.up = function (knex) {
  return knex.schema.createTable('taxTableEntry', (table) => {
    table.increments('id').primary().notNullable();

    // entry type ('IVA' or 'IS' or 'NS')
    table.string('type').notNullable();
    table.string('countryRegion').notNullable();
    // entry type ('RED' or 'INT' or 'NOR' or 'ISE' or 'OUT')
    table.string('code').notNullable();
    table.string('description').notNullable();
    table.float('percentage', 6).notNullable();

    table.timestamp('createdAt', { useTz: true }).defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('taxTableEntry');
};
