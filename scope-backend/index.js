const app = require('./app');
const config = require('./config');
const jasmin = require('./util/jasmin');

const { port } = config.express;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});




const test = jasmin.jasminRequest('get','materialscore/materialsitems');
 