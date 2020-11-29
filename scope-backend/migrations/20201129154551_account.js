
exports.up = function(knex) {
    return knex.schema.createTable('account', (table) => {
        //table with all SAFT account details
        table.uuid('id').notNullable().primary().defaultTo(knex.raw('uuid_generate_v4()'));
        table.integer('account_id').notNullable();
        table.string('description').notNullable();
        table.integer('opening_debit_balance').notNullable();
        table.integer('opening_credit_balance').notNullable();
        table.integer('closing_debit_balance').notNullable();
        table.integer('closing_credit_balance').notNullable();
        table.string('group_category').notNullable();
        table.integer('group_code').notNullable();
        table.integer('taxonomy_code'),notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('account');
};






<GroupingCategory>GM</GroupingCategory>
<GroupingCode>11</GroupingCode>
<TaxonomyCode>1</TaxonomyCode>