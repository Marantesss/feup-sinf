const express = require('express');
const jasmin = require('../../util/jasmin');
const router = express.Router();

router.get('/:id', async (req, res) => {
    const itemID = req.params.id;
    //console.log('materialscore/materialsitems/${itemID}/extension');
    jasmin.jasminRequest('get', `materialscore/materialsitems/${itemID}/extension`).then(
        (item) => {
            res.json(item);
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
