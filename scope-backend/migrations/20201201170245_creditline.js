
exports.up = function(knex) {
    return knex.schema.createTable('creditline', (table) => {
        table.integer('id').notNullable();
       // table.string('transaction_id').notNllable().references('id'),inTable('transaction');
        table.integer('accountID').notNullable().references('account_id').inTable('account');
        table.string('source_documentID').notNullable();
        table.string('date').notNullable();
        table.string('description').notNullable();
        table.float('credit_amount').notNullable();
});
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('creditline');
};
