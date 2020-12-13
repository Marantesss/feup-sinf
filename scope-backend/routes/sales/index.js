const express = require('express');
const jasmin = require('../../util/jasmin');
const router = express.Router();


router.get('/', (_req, res) => {
    //return res.json({ status: 200, message: 'Sales Index' });
    jasmin.jasminRequest('get', '/billing/invoices').then((data)=>{res.json(data)});
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
                        revenue: sale.lineExtensionAmount.amount,
                        warehouseDescription: sale.warehouseDescription,
                        warehouse: sale.warehouse
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
            const err = new Error("Failed to fetch Sales");
            err.status = 400;
            res.status(400).json({
                message: err.message,
                error: err
            });
        });





});


router.get('/customers', (_req, res) => {
    jasmin.jasminRequest("get", "/salesCore/customerParties/").then(
        (customersData) => {
            const customers = [];

            customersData.forEach((customer) => {
                customers.push({
                    customerKey: customer.partyKey,
                    name: customer.name,
                    adress: customer.streetName || "-",
                    postalZone: customer.postalZone || "-",
                    city: customer.cityName || "-",
                    website: customer.websiteUrl || "-",
                    taxID: customer.companyTaxID || "-",
                    country: customer.countryDescription,
                    

                });
            });



            res.json(customers);
        })
    
    
    
    
    
    .catch(() => {
        const err = new Error("Failed to customer sales");
        err.status = 400;
        res.status(400).json({
            message: err.message,
            error: err
        });
    });


});


module.exports = router;