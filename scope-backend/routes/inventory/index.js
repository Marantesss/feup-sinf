const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares')

const stockRouter = require('./stock');

// routes are protected with user authentication
//router.use(authenticate);
router.get('/', (req, res) => {
  return res.json({ status: 200, message: 'Inventory Index' });
});
router.use('/stock', stockRouter);

module.exports = router;
