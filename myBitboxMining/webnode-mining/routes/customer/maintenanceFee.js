var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');

// import class manager

// import model

// import const
const varibale = require('../../const/variable');
const FileHelper = require('../../global/FileHelper');
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/maintenance-fee', (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    res.render('customer/maintenanceFee/index', {
        "title" : showMessage('TITLE_CUSTOMER_MAINTAINCE_FEE'),
        "menu_active" : 'maintenance-fee',
        "fullname" : req.session.customer.fullname
    })
})
module.exports = router;
