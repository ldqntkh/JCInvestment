var express = require('express');
var router = express.Router();

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/my-history', (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');

    res.render('customer/history/index', {
        "title" : showMessage('TITLE_CUSTOMER_HISTORY'),
        "menu_active" : 'my-history',
        "fullname" : req.session.customer.fullname
    })
});

module.exports = router;