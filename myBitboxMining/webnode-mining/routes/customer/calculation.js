var express = require('express');
var router = express.Router();
/* GET calculation page. */
router.get('/calculation', function (req, res, next) {
    if (!req.session.customer) res.redirect('/login');
    res.render('customer/calculation', {
        "title" : "Calculation",
        "menu_active": "calculation",
        "fullname" : req.session.customer.fullname
    });
});
module.exports = router;
