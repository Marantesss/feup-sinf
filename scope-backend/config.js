const dotenv = require('dotenv');

dotenv.config();

config = {};

config.express = {
  port: process.env.PORT || 8001,
  timeout: 20000,
  maxAge: 600
};

config.jwtSecret = process.env.JWT_SECRET || 'secretstring';

config.db = {
  client: process.env.DB_CLIENT,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
};

config.jasmin = {
  clientSecret: process.env.JM_CLIENT_SECRET
}

module.exports = config;
