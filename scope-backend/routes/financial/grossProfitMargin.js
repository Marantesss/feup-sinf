const express = require('express');

const router = express.Router();


/**
 * Get balance sheet data
 */
router.get('/', async (req, res) => {
  
  return res.json({ status: 200 });

});

module.exports = router;
