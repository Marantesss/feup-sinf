const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares')

const accountsRouter = require('./accounts');

// routes are protected with user authentication
//router.use(authenticate);
router.get('/', (req, res) => {
  return res.json({ status: 200, message: 'alive' });
});
router.use('/accounts', accountsRouter);

module.exports = router;
