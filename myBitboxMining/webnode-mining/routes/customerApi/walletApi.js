var express = require('express');
var router = express.Router();
const moment = require('moment');
// import class manager
const WalletManager = require('../../modelMgrs/WalletManager');

// import model
const WalletModel = require('../../models/Wallet');

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/list', async (req, res, next)=> {
    if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : showMessage('ERROR_AUTHENTICATION')
        });
    } else {
        try {
            let listWallet = await WalletManager.getListWalletWithCalculation([{
                customerId : req.session.customer.id
            },
            {
            }]);
            res.send({
                status: "success",
                data : listWallet,
                errMessage : ""
            });
        } catch (err) {
            res.send({
                status: "fail",
                data : null,
                errMessage : err.message
            });
        }
    }
});



router.post('/add-wallet',async (req, res, next) => {
    if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : showMessage('ERROR_AUTHENTICATION')
        });
    } else {
        try {
            let walletAddress = req.body.wallet_address,
                walletName = req.body.wallet_name;

            if (typeof walletAddress === 'undefined' || typeof walletName === 'undefined' || walletAddress === "" || walletName === "") {
                res.send({
                    status: "fail",
                    data : null,
                    errMessage : showMessage('ERROR_CANNOT_GET_VALUE')
                });
            } else {
                let checkWallet = await WalletManager.getWalletByAddress({
                    walletAddress : walletAddress
                    // chỉ tồn tại duy nhất 1 address nên ko cần check user
                    // customerId : req.session.customer.id
                });

                if (checkWallet !== null) {
                    res.send({
                        status: "fail",
                        data : null,
                        errMessage : showMessage('ERROR_WALLET_NOT_EXISTS')
                    });
                } else {
                    let wallet = new WalletModel({
                        walletAddress : walletAddress,
                        walletName : walletName,
                        walletTypeId : 1,
                        customerId : req.session.customer.id,
                        createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                        updateAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                    })
                    wallet = await WalletManager.addNewWallet(wallet);
                    if (wallet !== null) {
                        res.send({
                            status: "success",
                            data : wallet,
                            errMessage : ""
                        });
                    }
                    else {
                        res.send({
                            status: "fail",
                            data : null,
                            errMessage : showMessage('ERROR_CANNOT_CREATE_WALLET')
                        });
                    }
                }
            }
        } catch (err) {
            res.send({
                status: "fail",
                data : null,
                errMessage : err.message
            });
        }
    }
});

router.get('/:walletId/delete', async(req, res, next) => {
    if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : showMessage('ERROR_AUTHENTICATION')
        });
    } else {
        try {
            let walletId = req.params.walletId;
            let result = await WalletManager.deleteWallet({
                id : walletId,
                customerId : req.session.customer.id
            });
            if (result > 0) {
                res.send({
                    status: "success",
                    data : null,
                    errMessage : null
                });
            } else {
                res.send({
                    status: "fail",
                    data : null,
                    errMessage : showMessage('ERROR_CANNOT_REMOVE_WALLET')
                });
            }
            
        } catch (err) {
            res.send({
                status: "fail",
                data : null,
                errMessage : err.message
            });
        }
    }
});

router.post('/:walletId/update', async(req, res, next) => {
    if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : showMessage('ERROR_AUTHENTICATION')
        });
    } else {
        try {
            let walletItem = req.body.walletItem;
            if (walletItem !== null) {
                walletItem = new WalletModel(walletItem);
                let result = await WalletManager.updateWallet(walletItem);
                if (result > 0) {
                    res.send({
                        status: "success",
                        data : walletItem,
                        errMessage : null
                    });
                } else {
                    res.send({
                        status: "fail",
                        data : null,
                        errMessage : showMessage('ERROR_CANNOT_UPDATE_WALLET')
                    });
                }
            } else {
                res.send({
                    status: "fail",
                    data : null,
                    errMessage : showMessage('ERROR_CANNOT_GET_VALUE')
                });
            }
        } catch (err) {
            res.send({
                status: "fail",
                data : null,
                errMessage : err.message
            });
        }
    }
});

module.exports = router;
