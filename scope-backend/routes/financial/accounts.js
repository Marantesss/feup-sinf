const express = require('express');

const router = express.Router();


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

  const accountDescriptions = [
    {
      id: 11,
      description: "Caixa",
    },
    {
      id: 12,
      description: "Depósitos à ordem",
    },
    {
      id: 13,
      description: "Depósitos a prazo",
    },
    {
      id: 14,
      description: "Outros depósitos bancários",
    },
    {
      id: 21,
      description: "Clientes",
    },
    {
      id: 22,
      description: "Fornecedores",
    },
    {
      id: 23,
      description: "Empréstimos obtidos",
    },
    {
      id: 24,
      description: "Estado e outros entes públicos",
    },
    {
      id: 25,
      description: "Acionistas",
    },
    {
      id: 26,
      description: "Outros devedores e credores",
    },
    {
      id: 27,
      description: "Acréscimos de diferimentos",
    },
    {
      id: 28,
      description: "Ajustamentos de dívidas a receber",
    },
    {
      id: 29,
      description: "Provisões",
    },
    {
      id: 31,
      description: "Compras",
    },
    {
      id: 32,
      description: "Mercadorias",
    },
    {
      id: 33,
      description: "Produtos acabados e intermédios",
    },
    {
      id: 34,
      description: "Subprodutos, desperdícios. resíduos e refugos",
    },
    {
      id: 35,
      description: "Produtos e trabalhos em cursoSubprodutos, desperdícios. resíduos e refugos",
    },
    {
      id: 36,
      description: "Matérias-primas, subsidiárias e de consumo",
    },
    {
      id: 37,
      description: "Adiantamentos por conta de compras",
    },
    {
      id: 38,
      description: "Regularização de existências",
    },
    {
      id: 39,
      description: "Ajustamentos de existências",
    },
    {
      id: 41,
      description: "Investimentos financeiros",
    },
    {
      id: 42,
      description: "Imobilizações corpóreas",
    },
    {
      id: 43,
      description: "Imobilizações incorpóreas",
    },
    {
      id: 44,
      description: "Imobilizações em curso",
    },
    {
      id: 45,
      description: "Investimentos em curso",
    },
    {
      id: 46,
      description: "Ativos não correntes detidos para venda",
    },
    {
      id: 51,
      description: "Capital subscrito",
    },
    {
      id: 52,
      description: "Acções (quotas) próprias",
    },
    {
      id: 53,
      description: "Prestações suplementares",
    },
    {
      id: 54,
      description: "Prémios de emissão de acções (quotas)",
    },
    {
      id: 55,
      description: "Ajustamentos de partes de capital em filiais e associadas",
    },
    {
      id: 56,
      description: "Reservas de reavaliação",
    },
    {
      id: 57,
      description: "Reservas",
    },
    {
      id: 58,
      description: "Excedentes de revalorização de ativos fixos tangíveis e intangíveis",
    },
    {
      id: 59,
      description: "Outras variações no capital próprio",
    },
    {
      id: 61,
      description: "Custo das mercadorias vendidas e das matérias consumidas",
    },
    {
      id: 62,
      description: "Fornecimentos e serviços externos",
    },
    {
      id: 63,
      description: "Gastos com o pessoal",
    },
    {
      id: 64,
      description: "Gastos de depreciação e de amortização",
    },
    {
      id: 65,
      description: "Perdas por imparidade",
    },
    {
      id: 66,
      description: "Perdas por reduções de justo valor",
    },
    {
      id: 67,
      description: "Provisões do período",
    },
    {
      id: 68,
      description: "Outros gastos",
    },
    {
      id: 69,
      description: "Gastos de financiamento",
    },
    {
      id: 71,
      description: "Vendas",
    },
    {
      id: 72,
      description: "Prestações de serviços ",
    },
    {
      id: 73,
      description: "Variações nos inventários da produção",
    },
    {
      id: 74,
      description: "Trabalhos para a própria entidade",
    },
    {
      id: 75,
      description: "Subsídios à exploração",
    },
    {
      id: 76,
      description: "Reversões",
    },
    {
      id: 77,
      description: "Ganhos por aumentos de justo valor",
    },
    {
      id: 78,
      description: "Outros rendimentos",
    },
    {
      id: 79,
      description: "Juros, dividendos e outros rendimentos similares",
    },
    {
      id: 81,
      description: "Resultado líquido do período",
    },
    {
      id: 89,
      description: "Dividendos antecipados",
    },
  ];

  // pupulating accounts in paralel
  const accounts = await Promise.all(accountDescriptions.map(async (account) => {
    return {
      id: account.id,
      description: account.description,
      ...await getAccountBalance(account.id)
    };
  }));

  return res.json({ status: 200, accounts });
});

/**
 * Get balance sheet data
 */
router.get('/balanceSheet', async (req, res) => {

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

    data.push({ totalCredit, totalDebit });
  }

  return res.json({ status: 200, data });
});

module.exports = router;
