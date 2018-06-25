var express = require('express');
var router = express.Router();
var moment  = require('moment');

var CustomerObj = require('../../models/Customer');

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
    // format birthday to render template
    var birthday = req.session.customer.birthday;
    if (birthday && birthday !== '') {
        req.session.customer.birthday = moment(new Date(birthday)).format('YYYY-MM-DD');
    }

    res.render('customer/profile', {
        "title" : "User Profile",
        "menu_active": "user",
        "fullname" : req.session.customer.fullname,
        "customer": req.session.customer
    });
});

module.exports = router;
