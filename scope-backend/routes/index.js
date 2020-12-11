const express = require('express');
const router = express.Router();

const authRouter = require('./auth');

router.get('/', (req, res) => {
  return res.json({ status: 200, message: 'alive' });
});

router.use('/', authRouter);

module.exports = router;
