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

const main = async () => {
  await app.parseData();
  await app.seedUser();
  await app.seedAccounts();
  await app.seedCustomers();
  return 'Completed';
};

main()
  .then(r => console.log(r))
  .catch(err => console.log(err));

// TODO: Delete this
console.log('isto vai fazer log primeiro que os logs do main');
