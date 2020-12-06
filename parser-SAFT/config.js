const dotenv = require('dotenv');

dotenv.config();

config = {};

config.db = {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

module.exports = config;
