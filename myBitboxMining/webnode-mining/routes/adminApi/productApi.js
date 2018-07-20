var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager');
const LocaleManager = require('../../modelMgrs/LocaleManager');

// import resource helper
const showAdminMessage = require('../../global/ResourceHelper').showAdminMessage;

router.get('/list', async (req, res, next)=> {
    let errMessage = '';
    try {
        // check session or token
        if (typeof req.session.user === 'undefined' || req.session.user === null) {
            errMessage = showAdminMessage('ERROR_AUTHENTICATION');
        } else {
            let listProduct = await ProductManager.getListProduct();
            if (listProduct.length > 0) {
                res.send({
                    status: "success",
                    data : listProduct,
                    errMessage : errMessage
                });
                return;
            } else {
                errMessage = showAdminMessage('ERROR_NOT_FOUND_PRODUCT');
            }
        }
    } catch (err) {
        errMessage = showAdminMessage('ERROR_GET_LIST_PRODUCT') + err.message;
    }
    res.send({
        status: "fail",
        data : null,
        errMessage : errMessage
    });
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

router.get('/:productId/delete', async (req, res) => {
    let errMessage = showMessage('ERROR_CANNOT_REMOVE_PRODUCT');
    try {
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: 'fail',
                data : null,
                errMessage : showMessage('ERROR_AUTHENTICATION')
            });
        } else {
            let productId = req.params.productId ? req.params.productId : '';
            if (await ProductOfCustomerManager.deleteProduct({id: productId}) > 0) {
                return res.send({
                    status: 'success',
                    data: null,
                    errMessage: null
                })
            }
        }
    } catch(err) {
        console.log(err.message);
    }
    res.send({
        status: 'fail',
        data : null,
        errMessage : errMessage
    });
});

router.get('/locale/list', async(req, res) => {
    let errMessage = '';
    try {
        if (!req.session.user) return res.redirect('/admin/login');

        let listLocale = await LocaleManager.getListLocale();
        if (listLocale.length > 0) {
            res.send({
                status: 'success',
                data: listLocale,
                errMessage: ''
            });
            return;
        } else {
            errMessage = showMessage('ERROR_NOT_FOUND_LOCALE');
        }
    } catch(err) {
        console.log(err.message);
        errMessage =  showMessage('ERROR_GET_LIST_LOCALE') + err.message;
    }
    res.send({
        status: 'fail',
        data: '',
        errMessage: errMessage
    })
});
module.exports = router;
