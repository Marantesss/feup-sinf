const express = require('express');
const jasmin = require('../../util/jasmin');
const router = express.Router();
const { getStockQuantity, getUnitPrice} = require('../../util/stock');


router.get('/', async (_req, res) => {
    console.log("Somebody Wants the stock");
    jasmin.jasminRequest('get', 'materialscore/materialsitems').then(
        (stockData) => {
            const response = { stockValue: 0 }
            stockData.forEach((materialItem) => {
                const quantity = getStockQuantity(materialItem);
                const value = getUnitPrice(materialItem);
                response.stockValue += quantity * value;
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
