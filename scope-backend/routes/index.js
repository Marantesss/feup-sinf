const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ status: 200, message: 'alive' });
});

router.get('/login', (req, res) => {
  return res.json({ status: 200, message: 'logg in'});
});

module.exports = router;
