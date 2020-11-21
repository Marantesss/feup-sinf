const dotenv = require('dotenv');

dotenv.config();

config = {};

config.express = {
  port: process.env.PORT || 8001,
  timeout: 20000,
  maxAge: 600
};

config.db = {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  database: process.env.DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

module.exports = config;
