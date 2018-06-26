var express = require('express');
var router = express.Router();
var moment  = require('moment');

var CustomerObj = require('../../models/Customer');
var CustomerManager = require('../../modelMgrs/CustomerManager');

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.customer) res.redirect('/login');
    res.render('customer/index', {
        "title" : "Dashboard",
        "menu_active": "dashboard",
        "fullname" : req.session.customer.fullname
    });
});

router.get('/user', async (req, res, next) => {
    try {
        if (!req.session.customer) res.redirect('/login');
        // format birthday to render template
        req.session.customer.birthday = moment(new Date(req.session.customer.birthday)).format('YYYY-MM-DD');
    } catch(err) {
        console.log('error while go to user page: ' + err.message);
    }

    res.render('customer/profile', {
        "title" : "User Profile",
        "menu_active": "user",
        "fullname" : req.session.customer.fullname,
        "customer":  req.session.customer
    });
});

module.exports = router;
