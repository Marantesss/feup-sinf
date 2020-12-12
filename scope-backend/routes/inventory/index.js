const express = require('express');
const router = express.Router();

const { authenticate } = require('../../middlewares')

const stockRouter = require('./stock');
const productRouter = require('./product');

// routes are protected with user authentication
//router.use(authenticate);
router.get('/', (req, res) => {
  return res.json({ status: 200, message: 'Inventory Index' });
});
router.use('/stock', stockRouter);
router.use('/product',productRouter);

module.exports = router;
