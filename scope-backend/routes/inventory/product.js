const express = require('express');
const jasmin = require('../../util/jasmin');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const itemID = req.params.id;
    const response = {}
    //jasmin.jasminRequest('get', `materialscore/materialsitems/${itemID}/extension`).then(
    jasmin.jasminRequest('get', `materialscore/materialsitems`).then(
        (item) => {
            const response = {}
            //const aux = item.find((element) => {element.itemKey == 1})
            item.forEach((element)=>{
                if(element.itemKey != itemID){
                    return
                }
                else{

                    response.product = element.description,
                    response.productKey = req.params.id,
                    response.upc = element.barcode,
                    response.description = element.complementaryDescription,
                    response.costOfGoods= []
                    element.materialsItemWarehouses.forEach((warehouse)=>{
                        response.costOfGoods.push(warehouse.calculatedUnitCost.amount) 

                    })
                    response.json = element


                }


            })


            res.json(response);
        }

    ).catch(
        () => {
            let err = new Error("Failed to retrive material item");
            err.status = 500;
            res.json({
                message: err.message,
                error: err
            });

        }
    )



})



module.exports = router;
