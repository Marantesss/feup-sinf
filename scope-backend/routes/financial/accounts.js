const express = require('express');

const router = express.Router();
const { validateAccount } = require('../../middlewares');
const { SNCAccounts } = require('../../util/financial');

/**
 * Get all accounts information
 */
router.get('/', async (req, res) => {
  const getAccountBalance = async (account) => {
    return await req.app.knex('account')
      .select('closingDebitBalance as debit', 'closingCreditBalance as credit')
      .where('id', account)
      .first();
  };

  // populating accounts in parallel
  const accounts = await Promise.all(SNCAccounts.map(async (account) => {
    return {
      id: account.id,
      description: account.description,
      ...await getAccountBalance(account.id)
    };
  }));

  return res.json({ status: 200, accounts });
});

/**
 * Get specific account information
 */
router.get('/:id',
  validateAccount,
  async (req, res) => {
    const accountId = req.params.id;

    const account = await req.app.knex('account')
      .select('closingDebitBalance as debit', 'closingCreditBalance as credit')
      .where('id', accountId)
      .first();

    return res.json({ status: 200, account });
  }
);

/**
 * Get specific account's total debit and credit
 * 
 * Query Strings
 *  - startDate
 *  - endDate
 */
router.get('/:id/sum',
  async (req, res) => {
    const accountId = req.params.id;

    const startDate = req.query.startDate ? req.query.startDate : '2019-01-01';
    const endDate = req.query.endDate ? req.query.endDate : '2019-12-31';

    // see if accountId is valid
    if (accountId[0] < 1 || accountId[0] > 9) {
      return res.json({ status: 404, message: `Account ${accountId} not found` });
    }

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

    return res.json({ status: 200, totalCredit, totalDebit });
  }
);

/**
 * Get specific account's total debit and credit by month
 */
router.get('/:id/monthly',
  validateAccount,
  async (req, res) => {
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

      data.push({ totalCredit, totalDebit });
    }

    return res.json({ status: 200, data });
  }
);


/**
 * Get specific account's total debit and credit by taxonomy
 * 
 * Query Strings
 *  - startDate
 *  - endDate
 */
router.get('/taxonomy/:taxo',
    async (req, res) => {
      const TaxonmyId = req.params.taxo;

      const startDate = req.query.startDate ? req.query.startDate : '2019-01-01';
      const endDate = req.query.endDate ? req.query.endDate : '2019-12-31';

      //get id's
       const Ids = await req.app.knex('account')
      .select('id')
      .where('taxonomyCode', TaxonmyId);

       
    //now sum all amounts in line table that corespond with each account id
   
     const  {sumCredit} = await req.app.knex('line')
     .join('transaction', 'line.transactionId', 'transaction.id')
     .where('line.accountId', 507)
     .andWhere('line.type', 'credit')
     .sum({ sumCredit: 'amount' })
     .first();
    console.log("sumcredit: ", sumCredit);
    return res.json({ status: 200, sumCredit });
  
     
    }
  );

module.exports = router;
