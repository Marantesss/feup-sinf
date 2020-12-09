const express = require('express');
const app = require('../../app');

const router = express.Router();

const { balanceSheet } = require('../../util/financial');

/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {

  const getTaxonomyBalance = async (taxonomy) => {
    const { balance } = await req.app.knex('account')
      .select(req.app.knex.raw('SUM("closingDebitBalance" - "closingCreditBalance") as "balance"'))
      .where('taxonomyCode', taxonomy)
      .first();

    console.log(balance);

    return balance;
  };

  return res.json({ status: 200, balance: await getTaxonomyBalance(2) });

});

module.exports = router;
