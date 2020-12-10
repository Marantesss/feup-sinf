const express = require('express');
const jasmin = require('../../util/jasmin');
const router = express.Router();


router.get('/', (_req, res) => {
    return res.json({ status: 200, message: 'Sales Index' });
});


router.get('/all', (_req, res) => {

    jasmin.jasminRequest('get', '/billing/invoices')
        .then((invoiceData) => {
            const response = {

                salesList: [],
            };

            salesList = [];

            invoiceData.map((bill) => {
                bill.documentLines.map((sale) => {
                    salesList.push({
                        id: sale.invoiceId,
                        product: sale.description,
                        quantity: sale.quantity,
                        value: sale.grossValue.amount,
                        date: sale.deliveryDate.split("T")[0],
                        revenue: sale.lineExtensionAmount.amount
                    });


                })



            })

            response.salesList = salesList.sort((a, b) => {
                if (a.date < b.date) {
                    return 1;
                }

                else if (a.date > b.date) {
                    return -1;
                }

                return 0;
            });


            res.json(response);

        }).catch((error) => {



            Promise.reject(error);
        });





});


module.exports = router;