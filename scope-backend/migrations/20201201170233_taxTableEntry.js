
exports.up = function (knex) {
  return knex.schema.createTable('taxTableEntry', (table) => {
    table.bigInteger('id').notNullable();

    // entry type ('IVA' or 'IS' or 'NS')
    table.string('type').notNullable();
    table.string('countryRegion').notNullable();
    // entry type ('RED' or 'INT' or 'NOR' or 'ISE' or 'OUT')
    table.string('code').notNullable();
    table.string('description').notNullable();
    table.float('percentage', 6).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('taxTableEntry');
};
