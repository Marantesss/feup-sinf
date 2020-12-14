const express = require('express');
const jasmin = require('../../util/jasmin');
const router = express.Router();

router.get('/', async (req, res) => {
    jasmin.jasminRequest("get", "/purchases/orders").then(
        (suppliersData) => {
            const suppliers = [];
            suppliersData.forEach((supplier) => {
                const accumulator = supplier.documentLines.reduce((accumulator, order) => {
                    accumulator.quantity += order.quantity;
                    accumulator.totalPrice += order.lineExtensionAmount.amount;
                    accumulator.num++;
                    return accumulator;
                }, { quantity: 0, totalPrice: 0, num: 0 });
                suppliers.push({
                    supplierName: supplier.sellerSupplierPartyName,
                    supplierKey: supplier.sellerSupplierParty,
                    quantity: accumulator.quantity,
                    value: accumulator.totalPrice.toFixed(2),
                    taxID: supplier.sellerSupplierPartyTaxId,
                    adress: supplier.sellerSupplierPartyAddress,
                    email: supplier.emailTo

                });

            });
            res.json(suppliers);
        }


    ).catch(
        (e) => {
            var err = new Error("Failed to fetch supplier");
            err.status = 500;
            res.json({
                message: err.message,
                error: err
            });
            throw e;
        }
    );




})

module.exports = router;