var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');

// import model

// import const
const varibale = require('../../const/variable');
const FileHelper = require('../../global/FileHelper');
const showAdminMessage = require('../../global/ResourceHelper').showAdminMessage;

router.get(/^\/(admin-product)/, (req, res, next) => {
    if (!req.session.user) return res.redirect('/admin/login');
    console.log('admin-product');
    res.render('admin/product/index', {
        "title" : showAdminMessage('TITLE_LIST_PRODUCT'),
        "menu_active" : 'admin-product',
        "fullname" : req.session.user.fullname
    })
})
module.exports = router;