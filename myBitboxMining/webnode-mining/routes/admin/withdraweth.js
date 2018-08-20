var express = require('express');
var router = express.Router();
const Op = require('sequelize').Op;
// import class manager
const WithdrawEthManager = require('../../modelMgrs/WithdrawEthManager');
// import model

// import const
const showAdminMessage = require('../../global/ResourceHelper').showAdminMessage;

router.get('/admin-withdraw', async (req, res, next) => {
    if (!req.session.user) return res.redirect('/admin/login');
    
    var dataResult = [];
    try {
        dataResult = await WithdrawEthManager.getAllWithDrawWithField({
            status: {
                [Op.or]: [2, 3]
            }
        });
        console.log(dataResult);
    } catch (err) {
        console.log(err.message);
        errMsg = err.message;
    }

    res.render('admin/withdraw/index', {
        "title" : showAdminMessage('TITLE_WITHDRAW_ETH'),
        "menu_active" : 'admin-withdraw',
        "fullname" : req.session.user.fullname,
        "obj_data" : {
            dataResult: dataResult
        }
    })
})
module.exports = router;