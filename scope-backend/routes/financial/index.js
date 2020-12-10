const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares')

const accountsRouter = require('./accounts');
const balanceSheetRouter = require('./balanceSheet');
const profitAndLossRouter = require('./profitAndLoss');
const grossProfitMarginRouter = require('./grossProfitMargin');

// routes are protected with user authentication
//router.use(authenticate);
router.get('/', (req, res) => res.json({ status: 200, message: 'Financial Index' }));

router.use('/accounts', accountsRouter);
router.use('/balanceSheet', balanceSheetRouter);
router.use('/profitAndLoss', profitAndLossRouter);
router.use('/grossProfitMargin', grossProfitMarginRouter);

module.exports = router;
