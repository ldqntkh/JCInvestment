var express = require('express');
var router = express.Router();

const ProductManager = require('../../modelMgrs/ProductManager');

router.get('/list', async (req, res, next)=> {
    let listProduct = await ProductManager.getListProduct({
        enable: 1
    });
    res.send(listProduct);
})
module.exports = router;
