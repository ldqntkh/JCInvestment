var express = require('express');
var router = express.Router();

// import const
const language = require('../../const/variableLabel');

router.get('/my-wallet', (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');

    res.render('customer/wallet/index', {
        "title" : language.en.TITLE_CUSTOMER_WALLET,
        "menu_active" : 'my-wallet',
        "fullname" : req.session.customer.fullname
    })
});

module.exports = router;