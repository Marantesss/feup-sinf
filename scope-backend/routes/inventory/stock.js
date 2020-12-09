const express = require('express');
const jasmin = require('../../util/jasmin');
const router = express.Router();
const { getStockValue} = require('../../util/stock');


router.get('/', async (_req, res) => {
    jasmin.jasminRequest('get', 'materialscore/materialsitems').then(
        (stockData) => {
            const response = { stockValue: 0 }
            stockData.forEach((materialItem) => {
                response.stockValue += getStockValue(materialItem);
            })
            res.json(response);
        }

    ).catch(
        () => {
            let err = new Error("Failed to retrive stock value");
            err.status = 500;
            res.json({
                message: err.message,
                error: err
            });
  
        }
    )




})



module.exports = router;
