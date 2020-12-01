
exports.up = function(knex) {
    return knex.schema.createTable('transaction', (table) => {
        table.string('id').notNullable();
        table.integer('period').notNullable();
        table.string('date').notNullable();
        table.string('sourceID').notNullable();
        table.string('description').notNullable();
        table.integer('doc_number').notNullable();
        table.string('type').notNullable();
        table.string('GL_date').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema
    .dropTable('transaction');
};
