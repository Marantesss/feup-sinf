const db = require('./config.js').db;

module.exports = {
  client: db.client,
  connection: {
    host: db.host,
    database: db.database,
    user: db.user,
    password: db.password,
    port: db.port,
  },
  pool: {
    min: 2,
    max: 10,
    propagateCreateError: false
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};
