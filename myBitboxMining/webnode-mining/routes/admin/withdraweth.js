var express = require('express');
var router = express.Router();
const Op = require('sequelize').Op;
const moment = require('moment');
// import class manager
const WithdrawEthManager = require('../../modelMgrs/WithdrawEthManager');
const CustomerManager = require('../../modelMgrs/CustomerManager');
const WalletManager = require('../../modelMgrs/WalletManager');

// import model

// import const
const showAdminMessage = require('../../global/ResourceHelper').showAdminMessage;
const showMessage = require('../../global/ResourceHelper').showMessage;
var EmailHelper = require('../../global/EmailHelper');

router.get('/admin-withdraw', async (req, res, next) => {
    if (!req.session.user) return res.redirect('/admin/login');
    
    var dataResult = [];
    try {
        dataResult = await WithdrawEthManager.getAllWithDrawWithField({
            status: {
                [Op.or]: [2, 3]
            }
        });
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
});

router.get('/admin-withdraw/:withdrawid', async (req, res, next) => {
    if (!req.session.user) return res.redirect('/admin/login');

    if (typeof req.params.withdrawid === 'undefined' || isNaN(req.params.withdrawid)) {
        return res.redirect('/admin/admin-withdraw');
    } else {
        let withdrawid = req.params.withdrawid;
        var errMsg = '';
        var dataResult = null;
        try {
            let withdraw = await WithdrawEthManager.getWithdrawEthByField({
                id: withdrawid
            });
            if (withdraw !== null) {
                if (withdraw.getStatus() === 2) {
                    // get wallet transfer
                    let wallet = await WalletManager.getWalletByAddress({
                        id : withdraw.getWalletId()
                    });
                    if (wallet !== null) withdraw.walletAddress = wallet.getWalletAddress();
                    else withdraw.walletAddress = '';
                    dataResult = withdraw;
                } else {
                    errMsg = 'Can not find withdraw with id:' + withdrawid;
                }
            } else {
                return res.redirect('/admin/admin-withdraw');
            }
        } catch (err) {
            console.log(err.message);
            errMsg = err.message;
        }
        res.render('admin/withdraw/withdraw-detail', {
            "title" : showAdminMessage('TITLE_WITHDRAW_ETH'),
            "menu_active" : 'admin-withdraw',
            "fullname" : req.session.user.fullname,
            "obj_data" : {
                dataResult: dataResult,
                err : errMsg
            }
        });
    }
});

router.post('/admin-withdraw/:withdrawid', async (req, res, next) => {
    if (!req.session.user) return res.redirect('/admin/login');

    if (typeof req.body.urlTransfer === 'undefined' || typeof req.params.withdrawid === 'undefined' || isNaN(req.params.withdrawid)) {
        return res.redirect('/admin/admin-withdraw');
    } else {
        let withdrawid = req.params.withdrawid;
        let urlTransfer = req.body.urlTransfer;
        var errMsg = '';
        var dataResult = null;
        try {
            let withdraw = await WithdrawEthManager.getWithdrawEthByField({
                id: withdrawid
            });
            if (withdraw !== null) {
                if (withdraw.getStatus() === 2) {
                    withdraw.setStatus(3);
                    withdraw.setUserUpdate(req.session.user.id);
                    withdraw.setUrlTransfer(urlTransfer);
                    withdraw.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                    let result = await WithdrawEthManager.updateWithdrawEth(withdraw);
                    if (result === -1) {
                        errMsg = 'Can not update status this withdraw. Please try again';
                    } else {
                        // send email xác nhận tới customer
                        // get customer
                        let customer = await CustomerManager.getCustomerByField({
                            id : withdraw.getCustomerId()
                        });
                        if (customer !== null) {
                            var options = {
                                to: customer.getEmail(),
                                subject: showMessage('LABEL_SUBJECT_SEND_WITHDRAW_ETH'),
                                html: showMessage('LABEL_HTML_WITHDRAW_URL_TRANSFER_ETH', [withdraw.getTotalEth(), urlTransfer])
                            }
                            await new EmailHelper().sendEmail(options);
                        }
                        
                        return res.redirect('/admin/admin-withdraw');
                    }
                } else {
                    errMsg = 'Can not find withdraw with id:' + withdrawid;
                }
            } else {
                return res.redirect('/admin/admin-withdraw');
            }
        } catch (err) {
            console.log(err.message);
            errMsg = err.message;
        }
        res.render('admin/withdraw/withdraw-detail', {
            "title" : showAdminMessage('TITLE_WITHDRAW_ETH'),
            "menu_active" : 'admin-withdraw',
            "fullname" : req.session.user.fullname,
            "obj_data" : {
                dataResult: dataResult,
                err : errMsg
            }
        });
    }
});

module.exports = router;