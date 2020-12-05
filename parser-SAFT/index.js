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

app.seedSuppliers = async () => {
  const suppliers = app.data.masterFiles.supplier;

  await app.knex('supplier').del();
  suppliers.forEach(async (supplier) => {
    const billingAddress = supplier.billingAddress;
    const shipfromAddress = supplier.shipFromAddress;
    const [billinId, shipingId] = await app.knex('address').insert([billingAddress, shipfromAddress]).return('id');

    const supplier_taxId = null;

    await app.knex('supplier').insert({
      id: supplier.supplierID,
      accountID: supplier.accountID,
      companyName: supplier.companyName,
      billingAddress: billinId,
      shipToAddress: shipingId,
      phone: supplier.telephone,
      selfBillingIndicator: supplier.selfBillingIndicator,
      taxId: supplier_taxId,
    });
  });
};

app.seedJournalsTransactions = async () => {
  const journals = app.data.generalLedgerEntries.journal;

  await app.knex('journal').del();
  await app.knex('transaction').del();
  await app.knex('line').del();
  journals.forEach(async (journal) => {
    // insert journal entry
    await app.knex('journal').insert({ id: journal.journalID, description: journal.description })

    const transactions = journal.transaction;
    transactions.forEach(async (transaction) => {
      // insert transaction entry
      await app.knex('transaction').insert({
        id: transaction.transactionID,
        journalId: journal.journalID,
        period: transaction.period,
        date: transaction.transactionDate,
        sourceId: transaction.sourceId,
        description: transaction.description,
        docArchivalNumber: transaction.docArchivalNumber,
        type: transaction.type,
        GLPostingDate: transaction.gLPostingDate
      });

      const creditLine = transaction.lines.creditLine;
      

      const debitLine = transaction.lines.debitLine;
    });
    console.log(transactions);
  });
};

const main = async () => {
  await app.parseData();
  await app.seedUser();
  await app.seedAccounts();
  await app.seedCustomers();
  await app.seedSuppliers();
  await app.seedJournalsTransactions();
  return 'Completed';
};

main()
  .then(r => console.log(r))
  .catch(err => console.log(err));

// TODO: Delete this
console.log('isto vai fazer log primeiro que os logs do main');
