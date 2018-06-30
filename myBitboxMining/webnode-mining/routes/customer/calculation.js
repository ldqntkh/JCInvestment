var express = require('express');
var router = express.Router();

// import const
const language = require('../../const/variableLabel');

/* GET calculation page. */
router.get('/calculation', function (req, res, next) {
    if (!req.session.customer) res.redirect('/login');
    res.render('customer/calculation', {
        "title" : language.en.TITLE_CUSTOMER_CALCULATION,
        "menu_active": "calculation",
        "fullname" : req.session.customer.fullname
    });
});
module.exports = router;
