var express = require('express');
var router = express.Router();

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/withdraw-eth', async (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');

    res.render('customer/withdraw/index', {
        "title" : showMessage('TITLE_WITHDRAW_ETH'),
        "menu_active" : 'withdraw-eth',
        "fullname" : req.session.customer.fullname,
        "obj_data" : {
            total_eth: "",
            description: "",
            err : ""
        }
    })
});

router.post('/withdraw-eth',async (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');
    let customerId = req.session.customer.id;
    let total_eth = req.body.total_eth.trim();
    let description = req.body.description;

    if (total_eth === "" || isNaN(total_eth)) {
        res.render('customer/withdraw/index', {
            "title" : showMessage('TITLE_WITHDRAW_ETH'),
            "menu_active" : 'withdraw-eth',
            "fullname" : req.session.customer.fullname,
            "obj_data" : {
                total_eth: total_eth,
                description: description,
                err : "Vui lòng nhập chính xác số ETH bạn cần rút"
            }
        })
    }
});

module.exports = router;