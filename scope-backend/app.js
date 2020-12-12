const express = require('express');
require('express-async-errors');
const cors = require('cors');
const helmet = require('helmet');

const config = require('./config').express;
const middlewares = require('./middlewares');
const indexRouter = require('./routes');
const financialRouter = require('./routes/financial');
const inventoryRouter = require('./routes/inventory');
const salesRouter = require('./routes/sales');
const purchasesRouter = require('./routes/purchases');

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
app.use('/financial', financialRouter);
app.use('/inventory',inventoryRouter);
app.use('/sales',salesRouter);
app.use('/purchases', purchasesRouter);
app.use(middlewares.notFound);

/* Handlers */
app.use(middlewares.error);

module.exports = app;
