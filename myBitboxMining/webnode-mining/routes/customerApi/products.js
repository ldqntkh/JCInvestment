var express = require('express');
var router = express.Router();

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager');

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
});

// get product of customer
router.get('/product_of_customer', async(req, res, next) => {
    try {
        // check session or token
        if (req.session.customer === null) {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let result = await ProductOfCustomerManager.getListProductOfCustomer({
                customerId : req.session.customer.id,
                expired : 0
            });
            res.send({
                status: "success",
                data : result,
                errMessage : null
            });
        }
    } catch(err) {
        console.log(err.message);
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
});
module.exports = router;
