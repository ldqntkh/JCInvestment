var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');
const LocaleManager = require('../../modelMgrs/LocaleManager');
const PriceBookManager = require('../../modelMgrs/PriceBookManager');

const ProductModel = require('../../models/Product');
// import resource helper
const {showAdminMessage, showMessage} = require('../../global/ResourceHelper');

// get list product ADMIN
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

// delete product by productId
router.get('/:productId/delete', async (req, res) => {
    let errMessage = showMessage('ERROR_CANNOT_REMOVE_PRODUCT');
    try {
        if (typeof req.session.user === 'undefined' || req.session.user === null) {
            res.send({
                status: 'fail',
                data : null,
                errMessage : showMessage('ERROR_AUTHENTICATION')
            });
        } else {
            let productId = req.params.productId ? req.params.productId : '';
            if (await ProductManager.deleteProduct({id: productId}) > 0) {
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

// get list locale ?? tại sao lại để chung trong productApi
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
            delete product.id;
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

// get product detail by productId
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
        // add userUpdate into product table
        data.userUpdate = req.session.user.id;

        // update attribute localeId when user choosing default language option
        data.localeId = data.localeId === '' ? 'en' : data.localeId;
        let existedProduct = await ProductManager.getProductByField([
            {id: productId},
        ]);

        let existedPriceBook = await PriceBookManager.getPriceBook({
            localeId: data.localeId,
            productId: productId
        });

        if (existedProduct.getId() !== null && existedPriceBook !== null && existedPriceBook.getLocaleId() === data.localeId) {
            product.localeId = data.localeId;
            product.productId = productId;
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
