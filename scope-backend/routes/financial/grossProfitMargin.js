const express = require('express');

const router = express.Router();

const { profitAndLoss } = require('../../util/financial');


/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {

  const getTaxonomyBalance = async (taxonomy) => {
    const result = await req.app.knex('taxonomySheet')
      .select(req.app.knex.raw('"openingDebit" - "openingCredit" as "openingBalance", "debit" - "credit" as "balance"'))
      .where('id', taxonomy)
      .first();

    return result !== undefined ? result.openingBalance + result.balance : 0;
  };

  const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
  };

  const calculateTaxonomies = async (entry) => {
    let currentSum = 0;

    // taxonomyCodes
    await Promise.all(entry.taxonomyCodes.map(async (taxonomy) => {
      const taxonomyBalance = await getTaxonomyBalance(Math.abs(taxonomy));
      const absoluteValue = Math.abs(taxonomyBalance);
      currentSum = taxonomy > 0 ? currentSum + absoluteValue : currentSum - absoluteValue;
    }));

    // ifCredit
    if (entry.ifCreditBalance) {
      await Promise.all(entry.ifCreditBalance.map(async (taxonomy) => {
        const taxonomyBalance = await getTaxonomyBalance(Math.abs(taxonomy));
        // if account balance is < 0 then the account is of type credit (conta credora)
        if (taxonomyBalance < 0) {
          const absoluteValue = Math.abs(taxonomyBalance);
          currentSum = taxonomy > 0 ? currentSum + absoluteValue : currentSum - absoluteValue;
        }
      }));
    }

    // ifDebit
    if (entry.ifDebtBalance) {
      await Promise.all(entry.ifDebtBalance.map(async (taxonomy) => {
        const taxonomyBalance = await getTaxonomyBalance(Math.abs(taxonomy));
        // if account balance is > 0 then the account is of type debit (conta devedora)
        if (taxonomyBalance > 0) {
          const absoluteValue = Math.abs(taxonomyBalance);
          currentSum = taxonomy > 0 ? currentSum + absoluteValue : currentSum - absoluteValue;
        }
      }));
    }

    // ifDebitOrCredit
    if (entry.ifCreditOrDebit) {
      await Promise.all(entry.ifCreditOrDebit.map(async (taxonomy) => {
        const taxonomyBalance = await getTaxonomyBalance(Math.abs(taxonomy))
        const absoluteValue = Math.abs(taxonomyBalance);
        currentSum = taxonomyBalance > 0 ? currentSum - absoluteValue : currentSum + absoluteValue;
      }));
    }

    return roundToTwo(currentSum);
  };

  // Custo das mercadorias vendidas e das matérias consumidas
  const cogsTaxonomies = profitAndLoss.expenses.find(elem => elem.name === 'Custo das mercadorias vendidas e das matérias consumidas');
  // Vendas e serviços prestados
  const netSalesTaxonomies = profitAndLoss.revenue.find(elem => elem.name === 'Vendas e serviços prestados');

  const cogs = await calculateTaxonomies(cogsTaxonomies);
  const netSales = await calculateTaxonomies(netSalesTaxonomies);
  const grossProfitMargin = roundToTwo((netSales - cogs) * 100 / netSales);

  return res.json({ status: 200, netSales, cogs, grossProfitMargin });

});

module.exports = router;
