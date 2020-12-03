
exports.up = function (knex) {
  return knex.schema.createTable('costumer', (table) => {
    //table with costumer details excetp adresses
    table.string('id').notNullable().primary().defaultTo('Consumidor Final');
    // reference to account
    table.bigInteger('accountId').references('id').inTable('account').onDelete('CASCADE');

    // reference to address
    table.integer('billingAddress').unsigned().references('id').inTable('address').onDelete('SET NULL');
    table.integer('shipToAddress').unsigned().references('id').inTable('address').onDelete('SET NULL');


    table.string('taxId').notNullable().defaultTo('999999990');
    table.string('companyName').notNullable().defaultTo('Consumidor Final');
    table.string('phone').notNullable();
    table.string('fax').notNullable()
    table.integer('selfBillingIndicator').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('costumer');
};
