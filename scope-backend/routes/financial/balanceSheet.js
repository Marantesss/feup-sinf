const express = require('express');

const router = express.Router();

/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {

  /**
  * 
  * @param {Array} accounts 
  */
  const getAccountsBalance = async (accounts) => {
    const { balance } = await req.app.knex('account')
      .select(req.app.knex.raw('SUM("closingDebitBalance" - "closingCreditBalance") as "balance"'))
      .whereIn('id', accounts)
      .first();

    return balance;
  }

  const balanceSheet = {
    assets: { // Ativo
      current: { // Ativo corrente
        cash: await getAccountsBalance([11, 12, 13, 14]),
        clients: await getAccountsBalance([21]),

      },
      nonCurrent: { // Ativo nao corrente

      },
      total: 0,
    },
    liabilities: { // Passivo
      current: { // Passivo corrente
        suppliers: await getAccountsBalance([22]),
        tax: await getAccountsBalance([24])
      },
      nonCurrent: { // Passivo nao corrente
        debt: await getAccountsBalance([23]),
        funding: await getAccountsBalance([25]),
      },
      total: 0,
    },
    equity: { // Capital Proprio
      total: 0,
    }
  };
});

module.exports = router;
