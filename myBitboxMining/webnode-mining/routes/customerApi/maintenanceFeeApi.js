var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const MaintenanceFeeManager = require('../../modelMgrs/MaintenanceFeeManager');
const WalletManager = require('../../modelMgrs/WalletManager');
const CustomerHistoryManager = require('../../modelMgrs/CustomerHistoryManager');

// import model
const CustomerHistoryModel = require('../../models/CustomerHistory');

// import const
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/maintenancefee', async (req, res, next)=> {
    try {
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let maintain = await MaintenanceFeeManager.getTotalMaintainFeeByField({
                customerId : req.session.customer.id,
                status: false
            });

            res.send({
                status: "success",
                data : maintain,
                errMessage : ""
            });
        }
    } catch (err) {
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
});

router.post('/maintainpaid', async (req, res, next) => {
    try {
        if (typeof req.session.customer === 'undefined' || req.session.customer === null || req.body.fee === 'undefined') {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let maintain = await MaintenanceFeeManager.getTotalMaintainFeeByField({
                customerId : req.session.customer.id,
                status: false
            });

            if (maintain !== null) {
                let fee = req.body.fee;
                let customerId = req.session.customer.id;
                // tru tien cua customer
                let result = await updateBalanceForCustomer(customerId, - Math.abs(fee));
                
                if (result) {
                    maintain.setStatus(true);
                    maintain.setPaymentMethod('ETH');
                    maintain.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                    let rs = await MaintenanceFeeManager.updateRecord(maintain);
                    if (rs !== -1) {
                        await CustomerHistoryManager.createHistory(new CustomerHistoryModel({
                            customerId: customerId,
                            description : showMessage('LABEL_MAINTENANCE_FEE_PAID', [fee + ' ETH']),
                            createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                        }));
                        res.send({
                            status: "success",
                            data : maintain,
                            errMessage : ""
                        });
                    } else {
                        res.send({
                            status: "fail",
                            data : null,
                            errMessage : "Can not paid maintenance fee record"
                        });
                    }
                } else {
                    res.send({
                        status: "fail",
                        data : null,
                        errMessage : "Can not paid maintenance fee"
                    });
                }
            } else {
                res.send({
                    status: "fail",
                    data : null,
                    errMessage : "Can not find maintenance fee"
                });
            }
        }
    } catch (err) {
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
});

var updateBalanceForCustomer = async(customerId, balance) => {
    try {
        let wallets = await WalletManager.getListWalletWithCalculation([{
            customerId : customerId
        }]);
        // mỗi wallet sẽ lấy được hashrate
        // tính ra được số coin
        // update balance
        // hien tai chi sp duy nhat 1 wallet => chi get wallet tai index 0
        var result = false;
        if (wallets !== null && wallets.length > 0) {
            for(let index = 0; index < wallets.length; index ++) {
                let wallet = wallets[index];
                result = await WalletManager.updateBalance({
                    walletId: wallet.id,
                    balance: balance,
                    customerId: customerId
                });
                break;
            }
        }
        return result;
    } catch (err) {
        console.log(err);
        return false;
    }
}


module.exports = router;
