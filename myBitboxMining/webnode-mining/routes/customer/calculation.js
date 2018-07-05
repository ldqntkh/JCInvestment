var express = require('express');
var router = express.Router();

// import const
const showMessage = require('../../global/FileHelper').showMessage;

/* GET calculation page. */
router.get('/calculation', function (req, res, next) {
    if (!req.session.customer) return res.redirect('/login');
    res.render('customer/calculation', {
        "title" : showMessage('TITLE_CUSTOMER_CALCULATION'),
        "menu_active": "calculation",
        "fullname" : req.session.customer.fullname
    });
});
module.exports = router;
