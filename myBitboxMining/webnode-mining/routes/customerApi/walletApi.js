var express = require('express');
var router = express.Router();
const moment = require('moment');
// import class manager
const WalletManager = require('../../modelMgrs/WalletManager');

// import model
const WalletModel = require('../../models/Wallet');

router.get('/list', async (req, res, next)=> {
    if (req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : "Authentication failed"
        });
    } else {
        try {
            let listWallet = await WalletManager.getListWallet({
                customerid : req.session.customer.id
            });
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
    if (req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : "Authentication failed"
        });
    } else {
        try {
            let walletAddress = req.body.wallet_address,
                walletName = req.body.wallet_name;

            if (typeof walletAddress === 'undefined' || typeof walletName === 'undefined' || walletAddress === "" || walletName === "") {
                res.send({
                    status: "fail",
                    data : null,
                    errMessage : "Can not get value"
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
                        errMessage : "Wallet address exists"
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
                            errMessage : "Can not create new wallet address"
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
    if (req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : "Authentication failed"
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
                    errMessage : 'Can not remove this wallet!'
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
