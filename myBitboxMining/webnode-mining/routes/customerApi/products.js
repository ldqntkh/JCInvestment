var express = require('express');
var router = express.Router();

const ProductManager = require('../../modelMgrs/ProductManager');

router.get('/list', async (req, res, next)=> {
    try {
        let listProduct = await ProductManager.getListProduct({
            enable: 1
        });
        res.send({
            status: "success",
            data : listProduct,
            errMessage : ""
        });
    } catch (err) {
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
})
module.exports = router;