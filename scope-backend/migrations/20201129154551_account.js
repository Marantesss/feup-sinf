
exports.up = function(knex) {
    return knex.schema.createTable('account', (table) => {
        //table with all SAFT account details
        table.integer('account_id').notNullable();
        table.string('description').notNullable();
        table.float('opening_debit_balance', 6).notNullable();
        table.float('opening_credit_balance', 6).notNullable();
        table.float('closing_debit_balance', 6).notNullable();
        table.float('closing_credit_balance', 6).notNullable();
        table.string('group_category').notNullable();
        table.integer('group_code').notNullable();
        table.integer('taxonomy_code'),notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('account');
};
