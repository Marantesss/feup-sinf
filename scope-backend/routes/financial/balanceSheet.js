const express = require('express');

const router = express.Router();

const { balanceSheet } = require('../../util/financial');

/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {

  const getAccountsByTaxonomy = async (taxonomy) => {
    const result = await req.app.knex('account')
      .select(req.app.knex.raw('id, "closingDebitBalance" - "closingCreditBalance" as "balance"'))
      .where('taxonomyCode', taxonomy);

    return result;
  };

  const calculateForm = async (form) => {
    const response = {
      entries: [],
      total: 0,
    };

    const roundToTwo = (num) => {
      return +(Math.round(num + "e+2") + "e-2");
    }

    // iterate over all equity entries
    await Promise.all(form.map(async (entry) => {
      let currentSum = 0;

      // taxonomyCodes
      await Promise.all(entry.taxonomyCodes.map(async (taxonomy) => {
        const taxonomyAccounts = await getAccountsByTaxonomy(Math.abs(taxonomy));
        taxonomyAccounts.forEach(account => {
          const absoluteValue = Math.abs(account.balance);
          currentSum = taxonomy > 0 ? currentSum + absoluteValue : currentSum - absoluteValue;
        });
      }));

      // ifCredit
      if (entry.ifCreditBalance) {
        await Promise.all(entry.ifCreditBalance.map(async (taxonomy) => {
          const taxonomyAccounts = await getAccountsByTaxonomy(Math.abs(taxonomy))
          taxonomyAccounts.forEach(account => {
            // if account balance is < 0 then the account is of type credit (conta credora)
            if (account.balance < 0) {
              const absoluteValue = Math.abs(account.balance);
              currentSum = taxonomy > 0 ? currentSum + absoluteValue : currentSum - absoluteValue;
            }
          });
        }));
      }

      // ifDebit
      if (entry.ifDebtBalance) {
        await Promise.all(entry.ifDebtBalance.map(async (taxonomy) => {
          const taxonomyAccounts = await getAccountsByTaxonomy(Math.abs(taxonomy))
          taxonomyAccounts.forEach(account => {
            // if account balance is > 0 then the account is of type debit (conta devedora)
            if (account.balance > 0) {
              const absoluteValue = Math.abs(account.balance);
              currentSum = taxonomy > 0 ? currentSum + absoluteValue : currentSum - absoluteValue;
            }
          });
        }));
      }

      // ifDebitOrCredit
      if (entry.ifCreditOrDebit) {
        await Promise.all(entry.ifCreditOrDebit.map(async (taxonomy) => {
          const taxonomyAccounts = await getAccountsByTaxonomy(Math.abs(taxonomy))
          taxonomyAccounts.forEach(account => {
            const absoluteValue = Math.abs(account.balance);
            currentSum = account.balance > 0 ? currentSum - absoluteValue : currentSum + absoluteValue;
          });
        }));
      }

      response.entries.push({ name: entry.name, balance: roundToTwo(currentSum) });
      response.total += roundToTwo(currentSum);
      currentSum = 0;
    }));

    response.total = roundToTwo(response.total)

    return response;
  }

  // calculate equity
  const equity = await calculateForm(balanceSheet.equity);
  // calculate assets
  const nonCurrentAssets = await calculateForm(balanceSheet.assets.nonCurrent);
  const currentAssets = await calculateForm(balanceSheet.assets.current);
  const assets = {
    nonCurrentAssets,
    currentAssets,
    total: nonCurrentAssets.total + currentAssets.total,
  };
  // calculate liabilities
  const nonCurrentLiabilities = await calculateForm(balanceSheet.assets.nonCurrent);
  const currentLiabilities = await calculateForm(balanceSheet.assets.current);
  const liabilities = {
    nonCurrentLiabilities,
    currentLiabilities,
    total: nonCurrentLiabilities.total + currentLiabilities.total,
  };

  return res.json({ status: 200, equity, assets, liabilities });

});

module.exports = router;
