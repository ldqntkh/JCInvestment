var express = require('express');
var router = express.Router();
var UserManager = require('../../modelMgrs/CustomerManager');
var db = require('../../modelMgrs/Database');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.customer) res.redirect('/login');
    res.render('customer/index', {
        "title" : "Dashborad",
        "menu_active": "dashboard"
    });
});

router.get('/user', function (req, res, next) {
    if (!req.session.customer) res.redirect('/login');
    res.render('customer/index', {
        "title" : "User Profile",
        "menu_active": "user"
    });
});

module.exports = router;
