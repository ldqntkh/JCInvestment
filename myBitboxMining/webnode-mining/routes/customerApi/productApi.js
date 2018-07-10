var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager');
const showMessage = require('../../global/ResourceHelper').showMessage;

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
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let result = await ProductOfCustomerManager.getListProductOfCustomer({
                customerId : req.session.customer.id
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

router.post('/update', async (req, res) => {
    let errMessage = showMessage('ERROR_UPDATE_PRODUCT');
    try {
        let product = req.body.productItem;
        if (product && product.walletId !== '') {
            let currentDate = moment(Date.now());

            product.startDate = currentDate.format('YYYY-MM-DD HH:mm:ss');
            product.endDate = currentDate.add(product.period, 'months').format('YYYY-MM-DD HH:mm:ss');
            product.active = true;
            product.updateAt = currentDate.format('YYYY-MM-DD HH:mm:ss');

            let affectedRows = await ProductOfCustomerManager.updateProduct(product, {id: product.id});

            if (affectedRows > 0) {
                product.startDate = moment(new Date(product.startDate)).format('DD/MM/YYYY');
                product.endDate = moment(new Date(product.endDate)).format('DD/MM/YYYY');
                return res.send({
                    status: 'success',
                    data: product,
                    errMessage: ''
                })
            }
        }
    } catch(err) {
        errMessage = errMessage + err.message;
    }
    res.send({
        status: 'fail',
        data: null,
        errMessage: errMessage
    });
});
module.exports = router;
