
exports.up = function(knex) {
    return knex.schema.createTable('supplier', (table) => {
        //table with SAFT supplier details except adresses
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.integer('supplier_id').notNullable();
        table.integer('acountID').notNullable().references('account.account_id');
        table.integer('tax_id').notNullable();
        table.integer('phone').notNullable();
        table.integer('self_billing_indicator').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('supplier');
};

