const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config').express;
const middlewares = require('./middlewares');
const indexRouter = require('./routes/index');
const exampleRouter = require('./routes/example');

const app = express();

/* Database*/
app.knex = require('./knex.js');

/* Middlewares */
app.use(cors({ maxAge: config.maxAge }));
app.use(helmet());
app.use(express.json());
app.use(middlewares.timeout);

/* Routers */
app.use('/', indexRouter);
app.use('/posts', exampleRouter);
app.use(middlewares.notFound);

/* Handlers */
app.use(middlewares.error);

module.exports = app;
