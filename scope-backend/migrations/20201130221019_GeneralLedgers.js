
exports.up = function(knex) {
    return knex.schema.createTable('GeneralLedgers', (table) => {
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.float('total_credit').notNullable();
        table.float('total_debit').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('GeneralLedgers');
};
