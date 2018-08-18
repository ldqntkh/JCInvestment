var express = require('express');
var router = express.Router();
const moment = require('moment');
// import model
const WithdrawETH = require('../../models/WithdrawEth');

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;
var EmailHelper = require('../../global/EmailHelper');
var FileHelper = require('../../global/FileHelper');

// import class manager
const WalletManager = require('../../modelMgrs/WalletManager');
const WithdrawEthManager = require('../../modelMgrs/WithdrawEthManager');

router.get('/list-withdraw-eth', async (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');
    var errMsg = '',
        dataResult = [];
    try {
        dataResult = await WithdrawEthManager.getAllWithDrawWithField({
            customerId : req.session.customer.id
        });
    } catch (err) {
        console.log(err.message);
        errMsg = err.message;
    }
    res.render('customer/withdraw/index', {
        "title" : showMessage('TITLE_WITHDRAW_ETH'),
        "menu_active" : 'withdraw-eth',
        "fullname" : req.session.customer.fullname,
        "obj_data" : {
            dataResult: dataResult,
            err : errMsg
        }
    });
});

router.get('/withdraw-eth', async (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');
    var unpaidBalance = 0;
    let resultBalance = await WalletManager.getTotalBalanceByCustomerId({
        customerId : req.session.customer.id 
    });
    if (resultBalance !== null && resultBalance.length > 0) {
        unpaidBalance = resultBalance[0].totalBalance;
    } 
    return res.render('customer/withdraw/form-withdraw', {
        "title" : showMessage('TITLE_WITHDRAW_ETH'),
        "menu_active" : 'withdraw-eth',
        "fullname" : req.session.customer.fullname,
        "obj_data" : {
            unpaidBalance: unpaidBalance,
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
    let _unpaidBalance = req.body.unpaidBalance;
    let errMsg;
    if (total_eth === "" || isNaN(total_eth) || parseFloat(total_eth) <= 0) {
        errMsg = showMessage('ERROR_DRAW_ETH_VALUE');
    } else {
        // get total eth in wallet
        let resultBalance = await WalletManager.getTotalBalanceByCustomerId({
            customerId : customerId
        });
        if (resultBalance !== null && resultBalance.length > 0) {
            unpaidBalance = resultBalance[0].totalBalance;
            let _total_eth = parseFloat(total_eth);
            if ( (unpaidBalance - (unpaidBalance * 0.05)) <= _total_eth) {
                _unpaidBalance = unpaidBalance;
                errMsg = showMessage('ERROR_DRAW_ETH_GET_MORE');
            } else {
                // get list wallet 
                let listWallet = await WalletManager.getListWalletWithCalculation([{
                    customerId : customerId
                },
                {
                }]);
                if (listWallet !== null && listWallet.length > 0) {
                    let walletId = listWallet[0].getWalletId();
                    // create model withdraw eth
                    let withdrawEth = new WithdrawETH({
                        customerId : customerId,
                        walletId : walletId,
                        total_eth: parseFloat(total_eth),
                        description: description,
                        status: 0,
                        createAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                    });

                    let result = await WithdrawEthManager.insertRequestWithdraw(withdrawEth);
                    if (result !== null) {
                        // trừ số tiền cần rút vào ví
                        await WalletManager.updateBalance({
                            walletId: walletId,
                            balance: - Math.abs(parseFloat(total_eth)),
                            customerId: customerId
                        });
                        // send email xác nhận tới customer
                        let token = {
                            id: result.getWithDrawId(),
                            customerId: withdrawEth.getCustomerId(),
                            status: withdrawEth.getStatus()
                        }
                        var verifyUrl = FileHelper.getUrl(req, 'confirm-withdraw-eth/' + FileHelper.encrypt(JSON.stringify(token)));
                        var options = {
                            to: req.session.customer.email,
                            subject: showMessage('LABEL_SUBJECT_VERIFY_WITHDRAW_ETH'),
                            html: showMessage('LABEL_HTML_WITHDRAW_ETH', [verifyUrl])
                        }
                        if (await new EmailHelper().sendEmail(options) !== null) {
                            return res.render('customer/withdraw/summary', {
                                title :  showMessage('TITLE_WITHDRAW_ETH'),
                                "menu_active" : 'withdraw-eth',
                                message: showMessage('WARNING_WITHDRAW_ETH')
                            });
                        }
                    } else {
                        errMsg = showMessage('ERROR_WITHDRAW_PROCESS');
                    }
                } else {
                    errMsg = showMessage('ERROR_WALLET_NOT_FOUND');
                }
            }
        } else {
            errMsg = showMessage('ERROR_DRAW_ETH_GET_BALANCE');
        }
    }

    return res.render('customer/withdraw/form-withdraw', {
        "title" : showMessage('TITLE_WITHDRAW_ETH'),
        "menu_active" : 'withdraw-eth',
        "fullname" : req.session.customer.fullname,
        "obj_data" : {
            unpaidBalance: _unpaidBalance,
            total_eth: total_eth,
            description: description,
            err : errMsg
        }
    });
});

router.get('/confirm-withdraw-eth/:token', async(req, res, next) => {
    try {
        if ( !req.session.customer ) return res.redirect('/login');
        var message = '';
        if (req.params.token && req.params.token !== '') {
            /**
             * token : {
             * id: id,
             * customerId: customerId,
             * status: 0}
             */
            var token = JSON.parse(FileHelper.decrypt(req.params.token.split('&')[0]));
            
            let customerId = req.session.customer.id;
            if (!token.hasOwnProperty('id') || !token.hasOwnProperty('id') || !token.hasOwnProperty('id')) {
                message = 'Authentication is not accurate';
            }
            else if (customerId === token.customerId && token.status === 0) {
                let result = await WithdrawEthManager.getWithdrawEthByField({
                    id: token.id,
                    customerId : token.customerId,
                    status: 0
                });

                if (result !== null) {
                    result.setStatus(1);
                    result.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                    let resultUpdate = await WithdrawEthManager.updateWithdrawEth(result);
                    if (resultUpdate === -1) {
                        message = showMessage('ERROR_WITHDRAW_UPDATE');
                    } else {
                        message = showMessage('SUCCESS_WITHDRAW_ETH');
                    }
                } else {
                    message = showMessage('ERROR_WITHDRAW_UPDATE_STATUS');
                }
            } else if (customerId !== token.customerId) {
                message = showMessage('ERROR_WITHDRAW_USER_REQUEST');
            } else if (token.status !== 0) {
                message = showMessage('ERROR_WITHDRAW_UPDATE_STATUS');
            }
        }
    } catch(err) {
        message = err.message;
    }

    return res.render('customer/withdraw/summary', {
        title :  showMessage('TITLE_WITHDRAW_ETH'),
        "menu_active" : 'withdraw-eth',
        message: message
    });
});

router.get('/withdraw-eth/cancel/:requestid', async (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');
    if (typeof req.params.requestid === 'undefined' || isNaN(req.params.requestid)) {
        return res.redirect('/list-withdraw-eth');
    } else {
        var errMsg = '';
        var dataResult = null;
        try {
            let withdraw = await WithdrawEthManager.getWithdrawEthByField({
                id: req.params.requestid,
                customerId : req.session.customer.id
            });
            if (withdraw !== null) {
                if (withdraw.getStatus() <= 1) {
                    dataResult = withdraw;
                } else {
                    errMsg = 'You can not cancel this request, because it is in the process of being processed.';
                }
            } else {
                return res.redirect('/list-withdraw-eth');
            }
        } catch (err) {
            console.log(err.message);
            errMsg = err.message;
        }
        res.render('customer/withdraw/withdraw-detail', {
            "title" : showMessage('TITLE_WITHDRAW_ETH'),
            "menu_active" : 'withdraw-eth',
            "fullname" : req.session.customer.fullname,
            "obj_data" : {
                dataResult: dataResult,
                err : errMsg
            }
        });
    }
});

router.post('/withdraw-eth/cancel/:requestid', async (req, res, next) => {
    if ( !req.session.customer ) return res.redirect('/login');
    if (typeof req.params.requestid === 'undefined' || isNaN(req.params.requestid)) {
        return res.redirect('/list-withdraw-eth');
    } else {
        var errMsg = '';
        var dataResult = null;
        try {
            let withdraw = await WithdrawEthManager.getWithdrawEthByField({
                id: req.params.requestid,
                customerId : req.session.customer.id
            });
            if (withdraw !== null) {
                if (withdraw.getStatus() <= 1) {

                    withdraw.setStatus(4); // cancel
                    withdraw.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                    let resultUpdate = await WithdrawEthManager.updateWithdrawEth(withdraw);
                    if (resultUpdate === -1) {
                        message = showMessage('ERROR_WITHDRAW_UPDATE');
                    } else {
                        //message = showMessage('SUCCESS_WITHDRAW_ETH');
                        let total_eth = withdraw.getTotalEth();
                        let wallet = await WalletManager.getWalletByAddress({
                            id : withdraw.getWalletId()
                        });
                        if (wallet !== null) {
                            // trả lại số tiền rút vào ví
                            await WalletManager.updateBalance({
                                walletId: wallet.getWalletId(),
                                balance: total_eth,
                                customerId: req.session.customer.id
                            });
                            // send email xác nhận tới customer
                            var options = {
                                to: req.session.customer.email,
                                subject: showMessage('LABEL_SUBJECT_VERIFY_WITHDRAW_ETH'),
                                html: showMessage('LABEL_HTML_WITHDRAW_CANCEL_ETH', [total_eth])
                            }
                            await new EmailHelper().sendEmail(options);
                            return res.redirect('/list-withdraw-eth'); 
                        } else {
                            errMsg = showMessage('ERROR_WALLET_NOT_FOUND');
                        }
                    }

                    dataResult = withdraw;
                } else {
                    errMsg = 'You can not cancel this request, because it is in the process of being processed.';
                }
            } else {
                return res.redirect('/list-withdraw-eth');
            }
        } catch (err) {
            console.log(err.message);
            errMsg = err.message;
        }
        res.render('customer/withdraw/withdraw-detail', {
            "title" : showMessage('TITLE_WITHDRAW_ETH'),
            "menu_active" : 'withdraw-eth',
            "fullname" : req.session.customer.fullname,
            "obj_data" : {
                dataResult: null,
                err : errMsg
            }
        });
    }
});

module.exports = router;