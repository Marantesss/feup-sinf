const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  return res.json({ status: 200, message: 'alive' });
});

module.exports = router;
