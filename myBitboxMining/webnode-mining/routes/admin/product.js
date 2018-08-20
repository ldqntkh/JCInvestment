var express = require('express');
var router = express.Router();

// import const
const showAdminMessage = require('../../global/ResourceHelper').showAdminMessage;

router.get(/^\/(admin-product)/, (req, res, next) => {
    if (!req.session.user) return res.redirect('/admin/login');
    res.render('admin/product/index', {
        "title" : showAdminMessage('TITLE_LIST_PRODUCT'),
        "menu_active" : 'admin-product',
        "fullname" : req.session.user.fullname
    })
})
module.exports = router;