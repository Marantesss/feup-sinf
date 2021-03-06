const express = require('express');
const router = express.Router();
const jasmin = require('../../util/jasmin');


const supplierRouter = require('./supplier');

// routes are protected with user authentication
//router.use(authenticate);
router.get('/', (_req, res) => {
  return res.json({ status: 200, message: 'purchases index' });
});

router.get('/all', (_req, res) => {
  jasmin.jasminRequest("get", "/purchases/orders").then(
    (purchasesRaw) => {

      const purchasesList = [];
      purchasesRaw.forEach((element) => {
        purchasesList.push({
          purchaseID: element.documentLines[0].orderId,
          supplierID: element.sellerSupplierParty,
          supplierName: element.sellerSupplierPartyName,
          supplierTaxID: element.sellerSupplierPartyTaxId,
          totalValue: element.payableAmount.amount,
          date: element.exchangeRateDate.split("T")[0],
          received: element.documentLines.reduce((accumulator, currValue) => {
            accumulator += currValue.quantity
            return accumulator;
          }, 0) == element.documentLines.reduce((accumulator, currValue) => {
            accumulator += currValue.receivedQuantity
            return accumulator;
          }, 0) || false,
          quantity: element.documentLines.reduce((accumulator, currValue) => {
            accumulator += currValue.quantity
            return accumulator;
          }, 0)
        })
      });

      res.json(purchasesList);

    }).catch(() => {
      let err = new Error("Failed to retrive purchase invoices");
      err.status = 400;
      res.json({
        message: err.message,
        error: err
      });
    });
});

router.get('/products', (_req, res) => {
  jasmin.jasminRequest("get", "/purchases/orders").then((purchasesRaw) => {
    const products = []

    purchasesRaw.map(
      (invoice) => {

        invoice.documentLines.map((line) => {
          const aux = products.find((aux) => {
            return aux.id == line.purchasesItem
          })
          if(aux == undefined){
          products.push({
            description: line.description,
            quantity: parseInt(line.quantity),
            value: parseFloat(line.lineExtensionAmount.amount),
            date: line.deliveryDate.split("T")[0],
            id: line.purchasesItem
          })}
          else {
            aux.value += parseFloat(line.lineExtensionAmount.amount),
            aux.quantity += parseInt(line.quantity)
          }
        })
      }
    )
  res.json(products)
  })
    .catch(() => {
      let err = new Error("Failed to retrive purchase invoices for products");
      err.status = 400;
      res.json({
        message: err.message,
        error: err
      });
    });

})

router.use('/supplier', supplierRouter);

module.exports = router;
