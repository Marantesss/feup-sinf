const bcrypt = require('bcrypt');

// Initialize app
const app = {};

// add knex for db seeding
app.knex = require('./knex');
// add parser
app.parser = require('./parser');
// add data
app.data = {};

app.parseData = async () => {
  app.data = await app.parser.readFile();
  console.log('Completed Parser');
  console.log(app.data);
};

app.seedUser = async () => {
  const header = app.data.header;
  // create user address and return id for referencing
  await app.knex('address').del();
  const [addressId] = await app.knex('address').insert(header.companyAddress).returning('id');
  // create user
  await app.knex('user').del();
  await app.knex('user').insert({
    id: header.companyID,
    name: header.companyName,
    businessName: header.businessName,
    telephone: header.telephone,
    fax: header.fax,
    email: header.email,
    password: bcrypt.hashSync('password', 10),
    address: addressId,
  });
};

app.seedAccounts = async () => {
  const accounts = app.data.masterFiles.generalLedgerAccounts.account;
  // change property names to match database columns
  accounts.forEach(account => {
    // https://stackoverflow.com/questions/4647817/javascript-object-rename-key
    // accountID -> id
    Object.defineProperty(account, 'id',
      Object.getOwnPropertyDescriptor(account, 'accountID'));
    delete account['accountID'];
    // accountDescription -> description
    Object.defineProperty(account, 'description',
      Object.getOwnPropertyDescriptor(account, 'accountDescription'));
    delete account['accountDescription'];
  });
  // seed database with new data
  console.log(accounts[0]);
  await app.knex('account').del();
  await app.knex('account').insert(accounts);
};

app.seedCustomers = async () => {
  const customers = app.data.masterFiles.customer;

  await app.knex('customer').del();
  customers.forEach(async (customer) => {
    // insert addresses
    const billingAddress = customer.billingAddress;
    const shipToAddress = customer.shipToAddress;
    const [billingId, shipId] = await app.knex('address').insert([billingAddress, shipToAddress]).returning('id');

    // TODO: Place this in parser
    // customer might not have an account
    customer.accountID = customer.accountID === 'Desconhecido' ? null : customer.accountID;

    // insert customer
    await app.knex('customer').insert({
      id: customer.customerID,
      accountId: customer.accountID,
      billingAddress: billingId,
      shipToAddress: shipId,
      taxId: customer.customerTaxID,
      companyName: customer.companyName,
      telephone: customer.telephone,
      fax: customer.fax,
      email: customer.email,
      website: customer.website,
      selfBillingIndicator: customer.selfBillingIndicator,
    });
  });
};

/**
 * Seeds Journal, Transactions and Lines
 */
app.seedJournalsTransactions = async () => {

  const deleteTableEntries = async () => {
    await app.knex('journal').del();
    await app.knex('transaction').del();
    await app.knex('line').del();
  }

  /**
   * 
   * @param {Object} journal 
   */
  const seedJournal = async (journal) => {
    await app.knex('journal').insert({ id: journal.journalID, description: journal.description });
  };

  /**
   * 
   * @param {Integer} journalId 
   * @param {Object} transaction 
   */
  const seedTransaction = async (journalId, transaction) => {
    await app.knex('transaction').insert({
      id: transaction.transactionID,
      journalId,
      period: transaction.period,
      date: transaction.transactionDate,
      sourceId: transaction.sourceID,
      description: transaction.description,
      docArchivalNumber: transaction.docArchivalNumber,
      type: transaction.transactionType,
      GLPostingDate: transaction.gLPostingDate
    });
  };

  /**
   * 
   * @param {String} type 
   * @param {Integer} transactionId 
   * @param {Object} line 
   */
  const seedLine = async (type, transactionId, line) => {
    const amount = type === 'debit' ? line.debitAmount : line.creditAmount;

    await app.knex('line').insert({
      id: line.recordID,
      transactionId,
      accountId: line.accountID,
      type,
      sourceDocumentId: line.sourceDocumentID,
      systemEntryDate: line.systemEntryDate,
      description: line.description,
      amount,
    });
  };

  // delete all table entries
  await deleteTableEntries();
  // get journal object
  const journals = app.data.generalLedgerEntries.journal;
  // iterate over journals
  journals.forEach(async (journal) => {
    // insert journal entry
    await seedJournal(journal);
    // get journal's transactions
    const transactions = journal.transaction;
    // iterate over transactions
    transactions.forEach(async (transaction) => {
      // insert transaction entry
      await seedTransaction(journal.journalID, transaction);
      // we are concatenating with an empty array because we might get an array or an object
      // from the debitLine attribute
      // https://www.samanthaming.com/tidbits/49-2-ways-to-merge-arrays/
      const debitLines = [].concat(transaction.lines.debitLine);
      // iterate over debitLines
      debitLines.forEach(async (line) => {
        // insert debitLine
        await seedLine('debit', transaction.transactionID, line)
      });
      
      const creditLines = [].concat(transaction.lines.creditLine);
      // iterate over creditLines
      creditLines.forEach(async (line) => {
        // insert creditLine
        await seedLine('credit', transaction.transactionID, line)
      });
    });
  });
};

const main = async () => {
  await app.parseData();
  await app.seedUser();
  await app.seedAccounts();
  await app.seedCustomers();
  await app.seedJournalsTransactions();
  return 'Completed';
};

main()
  .then(r => console.log(r))
  .catch(err => console.log(err));

// TODO: Delete this
console.log('isto vai fazer log primeiro que os logs do main');
