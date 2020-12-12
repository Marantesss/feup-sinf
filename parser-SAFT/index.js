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

  console.log(`Seeded User!`);
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
  await app.knex('account').del();
  await app.knex('account').insert(accounts);

  console.log(`Seeded ${accounts.length} Accounts!`);
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

  console.log(`Seeded ${customers.length} Customers!`);
};

app.seedSuppliers = async () => {
  const suppliers = app.data.masterFiles.supplier;

  await app.knex('supplier').del();
  suppliers.forEach(async (supplier) => {
    const billingAddress = supplier.billingAddress;
    const shipFromAddress = supplier.shipFromAddress;
    const [billingId, shippingId] = await app.knex('address').insert([billingAddress, shipFromAddress]).returning('id');

    // TODO: Place this in parser
    // customer might not have an account
    supplier.accountID = supplier.accountID === 'Desconhecido' ? null : supplier.accountID;

    await app.knex('supplier').insert({
      id: supplier.supplierID,
      accountId: supplier.accountID,
      companyName: supplier.companyName,
      billingAddress: billingId,
      shipToAddress: shippingId,
      phone: supplier.telephone,
      selfBillingIndicator: supplier.selfBillingIndicator,
      taxId: supplier.supplierTaxID,
    });
  });

  console.log(`Seeded ${suppliers.length} Suppliers!`);
};

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
  const counter = { journals: 0, transactions: 0, debitLines: 0, creditLines: 0 };
  // iterate over journals
  // https://stackoverflow.com/questions/37576685/using-async-await-with-a-foreach-loop
  await Promise.all(journals.map(async (journal) => {
    // insert journal entry
    await seedJournal(journal);
    counter.journals += 1;
    // get journal's transactions
    const transactions = journal.transaction;
    // iterate over transactions
    await Promise.all(transactions.map(async (transaction) => {
      // insert transaction entry
      await seedTransaction(journal.journalID, transaction);
      counter.transactions++;
      // we are concatenating with an empty array because we might get an array or an object
      // from the debitLine attribute
      // https://www.samanthaming.com/tidbits/49-2-ways-to-merge-arrays/
      const debitLines = [].concat(transaction.lines.debitLine);
      // iterate over debitLines
      await Promise.all(debitLines.map(async (line) => {
        // insert debitLine
        await seedLine('debit', transaction.transactionID, line)
        counter.debitLines++;
      }));

      const creditLines = [].concat(transaction.lines.creditLine);
      // iterate over creditLines
      await Promise.all(creditLines.map(async (line) => {
        // insert creditLine
        await seedLine('credit', transaction.transactionID, line)
        counter.creditLines++;
      }));
    }));
  }));

  console.log(`Seeded ${counter.journals} Journals!`);
  console.log(`Seeded ${counter.transactions} Transactions!`);
  console.log(`Seeded ${counter.debitLines} Debit Lines!`);
  console.log(`Seeded ${counter.creditLines} Credit Lines!`);

};

app.seedTaxTableEntries = async () => {
  const taxTableEntries = app.data.masterFiles.taxTable.taxTableEntry;

  await app.knex('taxTableEntry').del();
  taxTableEntries.forEach(async (entry) => {
    await app.knex('taxTableEntry').insert({
      type: entry.taxType,
      countryRegion: entry.taxCountryRegion,
      code: entry.taxCode,
      description: entry.description,
      percentage: entry.taxPercentage,
    });
  });

  console.log(`Seeded ${taxTableEntries.length} Tax Table Entries!`);
};

app.seedTaxonomySheet = async () => {
  await app.knex('taxonomySheet').del();
  // get distinct taxonomyCodes from all accounts
  const distinctTaxonomyCodes = await app.knex('account')
    .sum('openingDebitBalance as openingDebit')
    .sum('openingCreditBalance as openingCredit')
    .select('taxonomyCode as id')
    .whereNotNull('taxonomyCode')
    .groupBy('taxonomyCode');

  // get all transactions
  await Promise.all(distinctTaxonomyCodes.map(async (elem) => {
    // get all credit line transactions
    // filter out transactions of type 'A': Apuramento de resultados
    const { credit } = await app.knex('line')
      .sum({ credit: 'line.amount' })
      .join('account', 'account.id', 'line.accountId')
      .join('transaction', 'transaction.id', 'line.transactionId')
      .whereNot('transaction.type', 'A')
      .andWhere('account.taxonomyCode', elem.id)
      .andWhere('line.type', 'credit')
      .first();

    // get all debit line transactions
    const { debit } = await app.knex('line')
      .sum({ debit: 'line.amount' })
      .join('account', 'account.id', 'line.accountId')
      .join('transaction', 'transaction.id', 'line.transactionId')
      .whereNot('transaction.type', 'A')
      .andWhere('account.taxonomyCode', elem.id)
      .andWhere('line.type', 'debit')
      .first();

    await app.knex('taxonomySheet').insert({
      ...elem,
      credit: credit != null ? credit : undefined,
      debit: debit != null ? debit : undefined,
    });
  }));

};

const main = async () => {
  console.log('Parsing SAF-T...');
  await app.parseData();
  console.log('Done.');

  console.log(`Seeding Database ${process.env.DB_DATABASE} at ${process.env.DB_HOST}:${process.env.DB_PORT}...`)
  await app.seedUser();
  await app.seedAccounts();
  await app.seedCustomers();
  await app.seedSuppliers();
  await app.seedJournalsTransactions();
  await app.seedTaxTableEntries();
  console.log('Done.');
  console.log('Seeding Taxonomy Sheet...');
  await app.seedTaxonomySheet();
  console.log('Done.');

  return 'Completed';
};

main()
  .then((r) => {
    console.log(r);
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
