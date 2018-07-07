var express = require('express');
var router = express.Router();
const Op = require('sequelize').Op;
// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

// import class manager
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager'); 

/* GET calculation page. */
router.get('/calculation', async (req, res, next) => {
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

    res.render('customer/calculation', {
        "title" : showMessage('TITLE_CUSTOMER_CALCULATION'),
        "menu_active": "calculation",
        "fullname" : req.session.customer.fullname,
        "totalHs" : totalHs
    });
});
module.exports = router;
