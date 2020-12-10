const express = require('express');

const router = express.Router();


/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {

  const startDate = req.query.startDate ? req.query.startDate : '2019-01-01';
  const endDate = req.query.endDate ? req.query.endDate : '2019-12-31';

  const getAccountTransactionLinesBalance = async (accountId) => {
    // get all credit lines
    const { totalCredit } = await req.app.knex('line')
      .join('transaction', 'line.transactionId', 'transaction.id')
      .whereBetween('transaction.date', [startDate, endDate])
      .andWhere('line.accountId', 'like', `${accountId}%`)
      .andWhere('line.type', 'credit')
      .sum({ totalCredit: 'amount' })
      .first();

    // get all debit lines
    const { totalDebit } = await req.app.knex('line')
      .join('transaction', 'line.transactionId', 'transaction.id')
      .whereBetween('transaction.date', [startDate, endDate])
      .andWhere('line.accountId', 'like', `${accountId}%`)
      .andWhere('line.type', 'debit')
      .sum({ totalDebit: 'amount' })
      .first();

    return parseFloat((totalDebit - totalCredit).toFixed(2));
  };

  // are netSales calculated as debit - credit or the opposite?
  const netSales = await getAccountTransactionLinesBalance(71);
  const cogs = await getAccountTransactionLinesBalance(61);
  const grossProfitMargin = parseFloat(((netSales - cogs) * 100 / netSales).toFixed(2));

  return res.json({ status: 200, netSales, cogs, grossProfitMargin });

});

module.exports = router;
