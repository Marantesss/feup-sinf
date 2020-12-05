
exports.up = function (knex) {
  return knex.schema.createTable('line', (table) => {
    table.bigInteger('id').notNullable();

    // record/line type ('credit' or 'debit')
    table.string('type').notNullable();
    // reference to transaction
    table.string('transactionId').notNullable().references('id').inTable('transaction').onDelete('CASCADE');
    // reference to account
    table.bigInteger('accountId').references('id').inTable('account').onDelete('CASCADE'); // same as references('account.id')

    table.string('sourceDocumentId');
    table.timestamp('systemEntryDate', { useTz: true }).notNullable();
    table.string('description').notNullable();
    table.float('amount', 6).notNullable();

    // composite primary key
    table.primary(['id', 'transactionId']);
  });
};

exports.down = function (knex) {
  return knex.schema
    .dropTable('line');
};
