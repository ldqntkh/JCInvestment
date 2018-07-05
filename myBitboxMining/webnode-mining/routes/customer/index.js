var express = require('express');
var router = express.Router();
var moment  = require('moment');

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

/* GET home page. */
router.get('/', function (req, res, next) {
    if (!req.session.customer) return res.redirect('/login');
    res.render('customer/index', {
        "title" : showMessage('TITLE_CUSTOMER_DASHBOARD'),
        "menu_active": "dashboard",
        "fullname" : req.session.customer.fullname
    });
});

router.get('/user', async (req, res, next) => {
    try {
        if (!req.session.customer) return res.redirect('/login');
        // format birthday to render template
        if (req.session.customer.birthday !== null) {
            req.session.customer.birthday = moment(new Date(req.session.customer.birthday)).format('YYYY-MM-DD');
        }
    } catch(err) {
        console.log('error while go to user page: ' + err.message);
    }
    res.render('customer/profile', {
        "title" : showMessage('TITLE_CUSTOMER_PROFILE'),
        "menu_active": "user",
        "fullname" : req.session.customer.fullname,
        "customer":  req.session.customer
    });
});

module.exports = router;
