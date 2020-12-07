const express = require('express');

const router = express.Router();


/**
 * Get all accounts information
 */
router.get('/', async (req, res) => {
  const accounts = await req.app.knex('account');
  return res.json({ status: 200, accounts });
});

/**
 * Get specific account's total debit and credit
 * 
 * Query Strings
 *  - startDate
 *  - endDate
 */
router.get('/:id', async (req, res) => {
  const accountId = req.params.id;

  const startDate = req.query.startDate ? req.query.startDate : '2019-01-01';
  const endDate = req.query.endDate ? req.query.endDate : '2019-12-31';

  // get all credit lines
  const { totalCredit } = await req.app.knex('line')
    .join('transaction', 'line.transactionId', 'transaction.id')
    .whereBetween('transaction.date', [startDate, endDate])
    .andWhere('line.accountId', accountId)
    .andWhere('line.type', 'credit')
    .sum({ totalCredit: 'amount' })
    .first();

  // get all debit lines
  const { totalDebit } = await req.app.knex('line')
    .join('transaction', 'line.transactionId', 'transaction.id')
    .whereBetween('transaction.date', [startDate, endDate])
    .andWhere('line.accountId', accountId)
    .andWhere('line.type', 'debit')
    .sum({ totalDebit: 'amount' })
    .first();

  return res.json({ status: 200, totalCredit, totalDebit });
});

/**
 * Get specific account's total debit and credit by month
 * 
 * Query Strings
 *  - startDate
 *  - endDate
 */
router.get('/:id/monthly', async (req, res) => {
  const accountId = req.params.id;

  const data = [];
  for (const month of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
    // get all credit lines
    const { totalCredit } = await req.app.knex('line')
      .join('transaction', 'line.transactionId', 'transaction.id')
      .whereRaw(`EXTRACT(MONTH FROM transaction.date) = ${month}`)
      .andWhere('line.accountId', accountId)
      .andWhere('line.type', 'credit')
      .sum({ totalCredit: 'amount' })
      .first();
    // get all debit lines
    const { totalDebit } = await req.app.knex('line')
      .join('transaction', 'line.transactionId', 'transaction.id')
      .whereRaw(`EXTRACT(MONTH FROM transaction.date) = ${month}`)
      .andWhere('line.accountId', accountId)
      .andWhere('line.type', 'debit')
      .sum({ totalDebit: 'amount' })
      .first();

    data.push({totalCredit, totalDebit});
  }

  return res.json({ status: 200, data });
});

module.exports = router;
