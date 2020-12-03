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
}

app.seedUser = async () => {
  const header = app.data.header;
  console.log(header);
  console.log(header.companyAddress);
  // create user address
  await app.knex('address').insert({
    id: 1,
    ...header.companyAddress,
  });
  // create user
  //await app.knex('user').insert({

  //});
}

const main = async () => {
  await app.parseData();
  await app.seedUser();
  return 'Completed';
}

main()
  .then(r => console.log(r))
  .catch(err => console.log(err));

// TODO: Delete this
console.log('isto vai fazer log primeiro que os logs do main');
