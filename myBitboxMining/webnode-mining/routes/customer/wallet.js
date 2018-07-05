var express = require('express');
var router = express.Router();

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/my-wallet', (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');

    res.render('customer/wallet/index', {
        "title" : showMessage('TITLE_CUSTOMER_WALLET'),
        "menu_active" : 'my-wallet',
        "fullname" : req.session.customer.fullname
    })
});

module.exports = router;