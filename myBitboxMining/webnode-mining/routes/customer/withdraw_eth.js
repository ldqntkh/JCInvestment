var express = require('express');
var router = express.Router();

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/withdraw-eth', (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');

    res.render('customer/withdraw/index', {
        "title" : showMessage('TITLE_WITHDRAW_ETH'),
        "menu_active" : 'withdraw-eth',
        "fullname" : req.session.customer.fullname
    })
});

module.exports = router;