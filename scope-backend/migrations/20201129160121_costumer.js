
exports.up = function(knex) {
  return knex.schema.createTable('costumer', (table) => {
        //table with costumer details excetp adresses
        table.integer('costumer_id').notNullable();
        table.integer('accountID').notNullable().defaultTo(null).references('account.account_id');
        table.integer('taxID').notNullable();
        table.string('name').notNullable();
        table.string('phone').notNullable();
        table.string('fax').notNullable()
        table.integer('self_billing_indicator');
        });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('costumer');
};
