const express = require('express');

const router = express.Router();

const { profitAndLoss } = require('../../util/financial');

/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {

  const roundToTwo = (num) => {
    return +(Math.round(num + "e+2") + "e-2");
  };

  const getTaxonomyTransactions = async (taxonomy, month) => {

    const { credit } = await req.app.knex('line')
      .sum({ credit: 'line.amount' })
      .join('account', 'account.id', 'line.accountId')
      .join('transaction', 'transaction.id', 'line.transactionId')
      .whereRaw(`EXTRACT(MONTH FROM transaction.date) = ${month}`)
      .whereNot('transaction.type', 'A')
      .andWhere('account.taxonomyCode', taxonomy)
      .andWhere('line.type', 'credit')
      .first();

    const { debit } = await req.app.knex('line')
      .sum({ debit: 'line.amount' })
      .join('account', 'account.id', 'line.accountId')
      .join('transaction', 'transaction.id', 'line.transactionId')
      .whereRaw(`EXTRACT(MONTH FROM transaction.date) = ${month}`)
      .whereNot('transaction.type', 'A')
      .andWhere('account.taxonomyCode', taxonomy)
      .andWhere('line.type', 'debit')
      .first();

    return debit - credit;
  };

  const calculateTaxonomiesPerMonth = async (entry) => {

    const data = [];

    for (const month of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) {
      let currentSum = 0;

      // taxonomyCodes
      await Promise.all(entry.taxonomyCodes.map(async (taxonomy) => {
        const taxonomyBalance = await getTaxonomyTransactions(Math.abs(taxonomy), month);
        const absoluteValue = Math.abs(taxonomyBalance);
        currentSum = taxonomy > 0 ? currentSum + absoluteValue : currentSum - absoluteValue;
      }));

      // ifCredit
      if (entry.ifCreditBalance) {
        await Promise.all(entry.ifCreditBalance.map(async (taxonomy) => {
          const taxonomyBalance = await getTaxonomyTransactions(Math.abs(taxonomy), month);
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
          const taxonomyBalance = await getTaxonomyTransactions(Math.abs(taxonomy), month);
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
          const taxonomyBalance = await getTaxonomyTransactions(Math.abs(taxonomy), month)
          const absoluteValue = Math.abs(taxonomyBalance);
          currentSum = taxonomyBalance > 0 ? currentSum - absoluteValue : currentSum + absoluteValue;
        }));
      }

      data.push(roundToTwo(currentSum));
    }

    return data;
  };

  // Custo das mercadorias vendidas e das matérias consumidas
  const cogsTaxonomies = profitAndLoss.expenses.find(elem => elem.name === 'Custo das mercadorias vendidas e das matérias consumidas');
  // Vendas e serviços prestados
  const netSalesTaxonomies = profitAndLoss.revenue.find(elem => elem.name === 'Vendas e serviços prestados');

  const cogs = await calculateTaxonomiesPerMonth(cogsTaxonomies);
  const sales = await calculateTaxonomiesPerMonth(netSalesTaxonomies);

  return res.json({ status: 200, cogs, sales });
});

module.exports = router;
