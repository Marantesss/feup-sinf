const app = require('./app');
const config = require('./config');

const { port } = config.express;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
