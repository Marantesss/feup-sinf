const app = require('./app');
const config = require('./config');

const { port } = config.express;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});



axios.post('https://identity.primaverabss.com/connect/token', {
  grant_type: 'client_credentials',
  client_id: 'SCOPEJS',
  client_secret: process.env.CLIENT_SECRET,
  scope: application
})
.then(function (response) {
  console.log(response);
})
.catch(function (error) {
  console.log(error);
});



