var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.customer) res.redirect('/login');
    res.render('customer/index', {
        "title" : "Dashborad",
        "menu_active": "dashboard",
        "fullname" : req.session.customer.fullname
    });
});

router.get('/user', function (req, res, next) {
    if (!req.session.customer) res.redirect('/login');
    res.render('customer/index', {
        "title" : "User Profile",
        "menu_active": "user",
        "fullname" : req.session.customer.fullname
    });
});

module.exports = router;
