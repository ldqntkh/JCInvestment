var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager');
const LocaleManager = require('../../modelMgrs/LocaleManager');
const PriceBookManager = require('../../modelMgrs/PriceBookManager');

const ProductModel = require('../../models/Product');
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

router.post('/product/add', async(req, res) => {
    let errMessage = '';
    try {
        if (!req.session.user) return res.redirect('/admin/login');

        let data = req.body.product ? req.body.product : '';

        // add userUpdate into product table
        data.userUpdate = req.session.user.id;
        let product = await ProductManager.addProduct(new ProductModel(data));
        if (product !== null) {
            product.productId = product.getId();
            if (await PriceBookManager.addPriceBook(product) !== null) {
                res.send({
                    status: 'success',
                    data: '',
                    errMessage: errMessage
                });
                return;
            }
        }
        errMessage = showAdminMessage('ERROR_CREATE_PRODUCT');
    } catch(err) {
        console.log(err.message);
    }
    res.send({
        status: 'fail',
        data: '',
        errMessage: errMessage
    });
});

router.get('/product/detail/:productId', async(req, res) => {
    let errMessage = '';
    try {
        if (!req.session.user) return res.redirect('/admin/login');

        let product = await ProductManager.getProductByField([{id: req.params.productId}]);
        if (product !== null) {
            res.send({
                status: 'success',
                data: product,
                errMessage: errMessage
            });
            return;
        } else {
            errMessage = 'Can not get product detail';
        }
    } catch(err) {
        console.log(err.message);
    }
    res.send({
        status: 'fail',
        data: '',
        errMessage: errMessage
    });
});

router.post('/product/update/:productId', async(req, res) => {
    let errMessage = '';
    try {
        if (!req.session.user) return res.redirect('/admin/login');

        let data = req.body.product ? req.body.product : '';
        let productId = req.params.productId ? req.params.productId : '';
        let product = new ProductModel(data);
        let priceBooks = data.pricebooks;
        // add userUpdate into product table
        data.userUpdate = req.session.user.id;

        let existedProduct = await ProductManager.getProductByField([
            {id: productId},
        ]);

        let existedPriceBook = await PriceBookManager.getPriceBook({
            localeId: data.localeId
        });

        if (existedProduct.getId() !== null && existedPriceBook.getLocaleId() === data.localeId) {
            product.setId(productId);
            product.localeId = data.localeId;
            let affectedRows = await ProductManager.updateProduct(product);
            if (affectedRows > 0) {
                res.send({
                    status: 'success',
                    data: '',
                    errMessage: errMessage
                });
                return;
            }
        } else {
            data.productId = productId;
            if (await PriceBookManager.addPriceBook(data) !== null) {
                res.send({
                    status: 'success',
                    data: '',
                    errMessage: errMessage
                });
                return;
            }
        }

        errMessage = showAdminMessage('ERROR_CANNOT_UPDATE_PRODUCT');
    } catch(err) {
        console.log(err.message);
    }
    res.send({
        status: 'fail',
        data: '',
        errMessage: errMessage
    });
});

router.get('/product/:productId/locale/:localeId', async(req, res) => {
    let errMessage = '';
    try {
        if (!req.session.user) return res.redirect('/admin/login');

        let localeId = req.params.localeId === '' ? 'en' : req.params.localeId;
        let product = await ProductManager.getProductByField([{id: req.params.productId}, {localeId: localeId}]);
        if (product !== null) {
            res.send({
                status: 'success',
                data: product,
                errMessage: errMessage
            });
            return;
        } else {
            errMessage = 'Can not get product detail';
        }
    } catch(err) {
        console.log(err.message);
    }
    res.send({
        status: 'fail',
        data: '',
        errMessage: errMessage
    });
});
module.exports = router;
