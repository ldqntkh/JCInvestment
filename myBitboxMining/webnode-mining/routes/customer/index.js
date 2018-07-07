var express = require('express');
var router = express.Router();
var moment  = require('moment');
const Op = require('sequelize').Op;
// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

// import class manager
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager'); 

/* GET home page. */
router.get('/', async (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    let result = await ProductOfCustomerManager.getListTotalHashRate({
        customerId : req.session.customer.id,
        active: 1,
        expired: 0,
        walletId: {
            [Op.ne]: null
        }
    });
    let totalHs = 0;
    if (result !== null && result.length > 0) {
        totalHs = result[0].totalHashrate;
    }
    res.render('customer/index', {
        "title" : showMessage('TITLE_CUSTOMER_DASHBOARD'),
        "menu_active": "dashboard",
        "fullname" : req.session.customer.fullname,
        "totalHs" : totalHs
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
