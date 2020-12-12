const validateAccount = async (req, res, next)  => {
  const accountId = req.params.id;

  const account = await req.app.knex('account')
    .where('id', accountId)
    .first();

  if (!account) {
    return res.json({ status: 404, message: `Account with id ${accountId} not found.` });
  } else {
    return next();
  }
};

module.exports = validateAccount;
