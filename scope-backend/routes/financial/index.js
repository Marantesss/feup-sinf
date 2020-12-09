const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares')

const accountsRouter = require('./accounts');
const balanceSheetRouter = require('./balanceSheet');
const profitAndLossRouter = require('./profitAndLoss');

// routes are protected with user authentication
//router.use(authenticate);
router.get('/', (req, res) => res.json({ status: 200, message: 'Financial Index' }));

router.use('/accounts', accountsRouter);
router.use('/balanceSheet', balanceSheetRouter);
router.use('/profitAndLoss', profitAndLossRouter);

module.exports = router;
