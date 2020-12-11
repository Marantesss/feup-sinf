const express = require('express');

const router = express.Router();

const { profitAndLoss } = require('../../util/financial');

/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {

  const getAccountsByTaxonomy = async (taxonomy) => {
    /*
    Dos dados mestre de contas, vocês só podem considerar os valores de abertura, o resto dos valores terão que ir à transactions!
    Os saldos de abertura das contas 6 e 7, naturalmente terão que ser 0, pois estas contas são saldadas no processo de apuramento de resultados.
    const result = await req.app.knex('account')
      .select(req.app.knex.raw('id, "closingDebitBalance" - "closingCreditBalance" as "balance"'))
      .where('taxonomyCode', taxonomy);

    return result;
    */
    // filter out transactions of type 'A': Apuramento de resultados
    const creditResult = await req.app.knex('line')
      .select('account.id')
      .sum({ totalCredit: 'line.amount' })
      .join('account', 'account.id', 'line.accountId')
      .join('transaction', 'transaction.id', 'line.transactionId')
      .whereNot('transaction.type', 'A')
      .andWhere('account.taxonomyCode', taxonomy)
      .andWhere('line.type', 'credit')
      .groupBy('account.id');

    // get all totalDebit lines
    const debitResult = await req.app.knex('line')
      .select('account.id')
      .sum({ totalDebit: 'line.amount' })
      .join('account', 'account.id', 'line.accountId')
      .join('transaction', 'transaction.id', 'line.transactionId')
      .whereNot('transaction.type', 'A')
      .andWhere('account.taxonomyCode', taxonomy)
      .andWhere('line.type', 'debit')
      .groupBy('account.id');

    console.log(creditResult);
    console.log(debitResult);

    const result = [];

    creditResult.forEach((elem, index) => {
      result.push({
        id: elem.id,
        balance: debitResult[index].totalDebit - elem.totalCredit
      });
    });

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

  const revenue = await calculateForm(profitAndLoss.revenue);
  const expenses = await calculateForm(profitAndLoss.expenses);
  const depreciation = await calculateForm(profitAndLoss.depreciation);
  const interest = await calculateForm(profitAndLoss.interest);
  const taxes = await calculateForm(profitAndLoss.taxes);

  // 18 = (1 + 2 + ... + 5 - 6 - ... - 14 + 15 + 16 - 17)
  // 21=>ebit
  // 
  const ebitda = revenue.entries.reduce((prev, curr) => prev + curr.balance, 0) - expenses.entries.reduce((prev, curr) => prev + curr.balance, 0);
  const ebit = ebitda - depreciation.entries.reduce((prev, curr) => prev + curr.balance, 0);

  const incomeInterest = interest.entries.find(entry => entry.name === 'Juros e rendimentos similares obtidos').balance;
  const expenseInterest = interest.entries.find(entry => entry.name === 'Juros e gastos similares suportados').balance;
  const netIncome = ebit + incomeInterest - expenseInterest - taxes.entries.reduce((prev, curr) => prev + curr.balance, 0);

  return res.json({ status: 200, revenue, expenses, depreciation, interest, taxes, ebit, ebitda, netIncome });

});

module.exports = router;
