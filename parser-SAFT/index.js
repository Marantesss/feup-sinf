// Initialize app
const app = {};

// add knex for db seeding
app.knex = require('./knex');
// add parser
app.parser = require('./parser');

async function test() {
  const data = await app.parser.readFile(); 
  console.log(data);
  
  return 'return do main'
  
}

test().then(v => console.log(v));
console.log('isto vai fazer log primeiro que os logs do main');
