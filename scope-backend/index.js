const app = require('./app');
const config = require('./config');
const jasmin = require('./util/jasmin');

const { port } = config.express;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const test = jasmin.requestAccessToken();


//Check if  request token works
test.then(
  //(response) => {console.log(response)}
)



