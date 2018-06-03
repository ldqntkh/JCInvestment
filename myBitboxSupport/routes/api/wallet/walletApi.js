var express = require('express');
var router = express.Router();

const WalletManager = require('../../../modelMgrs/WalletManager');
const WalletObject = require('../../../models/Wallet');
const UserManager = require('../../../modelMgrs/UserManager');
const globalFunc = require('../../../globalFunctions');

/**
 * API get all wallet by user id
 * NOTE: don't check user log in or not
 */
router.get(['/wallet/:userid'], async(req, res, next)=> {
    try {
        let userid = req.params.userid;
        if (userid) {
            let walletMgr = new WalletManager(req.app.locals._db);
            let results = await walletMgr.getWalletByUserId(userid);
            res.send({
                errCode: 0,
                data: results,
                errMessage: null
            });
        } else {
            res.send({
                errCode: -1,
                data: null,
                errMessage: 'Cannot get wallet'
            });
        }
    } catch(error) {
        //console.log(error.message);
        globalFunc.writeLogFile('walletAPI-> get wallet/:userid', __filename, 44, error);
        res.send({
            errCode: -1,
            data: null,
            errMessage: 'The error message while get wallets: ' + error.message
        });
    }
});

/**
* API create or update wallet using method POST
* @param {Object} data has two attributes are token and walletData
* @return {Object} response
* @Error code: 0 (return not error)
*              1 (return error while requesting data from client)
*              2 (return error while account is not existed)
*              3 (return error while trying to insert into wallet)
*             -1 (return error when server has some issues)
*/
router.post(['/wallet/handled'], async (req, res) => {
    try {
        let userMgr = new UserManager(req.app.locals._db);
        let walletMgr = new WalletManager(req.app.locals._db);
        let data = req.body.data;
        if (data == undefined || data.token == undefined || data.walletData == undefined) {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'The request data is not valid'
            });
            return;
        }
        //decrypt the token
        let decryptToken = typeof data.token == 'string' ? JSON.parse(globalFunc.decrypt(data.token)) : {};
        let userId = decryptToken.userId;
        let walletData = data.walletData;
        let user = await userMgr.getUserById(userId);

        if (user) {
            let walletObj = new WalletObject(walletData);
            walletObj.setUserId(userId);
            let affectedRows = await walletMgr.addOrUpdateWallet(walletObj);
            if (affectedRows > 0) {
                res.send({
                    errCode: 0,
                    data: walletObj,
                    successMessage: 'Wallet id ' + walletObj.walletId + ' is created or updated successfully'
                });
            } else {
                res.send({
                    errCode: 3,
                    data: null,
                    errMessage: 'The wallet can not be created'
                });
            }
        } else {
            res.send({
                errCode: 2,
                data: null,
                errMessage: 'We do not find your account. Please try to login to create the wallet'
            });
        }
    } catch(error) {
        //console.log(error.message);
        globalFunc.writeLogFile('walletAPI-> post wallet/handled', __filename, 117, error);
        res.send({
            errCode: -1,
            data: null,
            errMessage: 'The error message while creating or updating new wallet is: ' + error.message
        });
    }
});

/**
* API delete wallet by wallet id using method GET
* @param {String} walletId
* @Error code: 0 (return not error)
*              1 (return error while requesting invalid data)
*              2 (return error while account is not existed)
*              3 (return error while wallet is not existed)
*              4 (return error while trying to delete wallet)
*             -1 (return error when server has some issues)
*/
router.post(['/wallet/delete'], async (req, res) => {
    try {
        let data = req.body.data;
        if (data == undefined || data.token == undefined || data.walletData == undefined) {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'The request data is not valid'
            });
            return;
        }
        //decrypt the token
        let decryptToken = typeof data.token == 'string' ? JSON.parse(globalFunc.decrypt(data.token)) : {};
        let userId = decryptToken.userId ? decryptToken.userId : '';
        let userMgr = new UserManager(req.app.locals._db);
        let existedUser = await userMgr.getUserById(userId);
        if (existedUser != null) {
            let walletManager = new WalletManager(req.app.locals._db);
            let walletId = data.walletData.walletId ? data.walletData.walletId : '';
            let existedWallet = await walletManager.getWalletByWalletId(walletId);
            if (existedWallet != null) {
                if (await walletManager.deleteWalletById(walletId) > 0) {
                    res.send({
                        errCode: 0,
                        data: null,
                        successMessage: 'Wallet is deleted successfully'
                    });
                } else {
                    res.send({
                        errCode: 3,
                        data: null,
                        errMessage: 'We are having some issues while trying to delete wallet'
                    });
                }
            } else {
                res.send({
                    errCode: 2,
                    data: null,
                    errMessage: 'Can not find wallet. Please try again'
                })
            }
        } else {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'Can not find the account. Please try to login'
            });
        }
    } catch(error) {
        globalFunc.writeLogFile('walletAPI-> get /wallet/walletId/delete', __filename, 117, error);
        res.send({errCode: -1});
    }
});

/**
* API delete wallet by user id using method GET
* @param {String} userId
* @Error code: 0 (return not error)
*              1 (return error while requesting data is invalid)
*              2 (return error if user is not existed or do not have permission)
*              3 (return error while wallet is not existed belong current account)
*              4 (return error while trying to delete wallet by user id)
*             -1 (return error when server has some issues)
*/
router.post(['/wallet/user/delete'], async (req, res) => {
    try {
        let data = req.body.data;
        if (data == undefined || data.token == undefined || data.walletData == undefined) {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'The request data is not valid'
        });
            return;
        }
        let decryptToken = typeof data.token == 'string' ? JSON.parse(globalFunc.decrypt(data.token)) : {};
        let userId = decryptToken.userId ? decryptToken.userId : '';
        let userManager = new UserManager(req.app.locals._db);
        let existedUser = await userManager.getUserById(userId);

        if (existedUser != null && existedUser.getLevel() == 'admin') {
            let walletManager = new WalletManager(req.app.locals._db);
            let existedWallets = await walletManager.getWalletByUserId(userId);
            if (existedWallets.length > 0) {
                if (await walletManager.deleteWalletByUserId(userId) > 0) {
                    res.send({
                        errCode: 0,
                        data: null,
                        successMessage: 'These wallet are belong to this account are deleted successfully'
                    });
                } else {
                    res.send({
                        errCode: 4,
                        data: null,
                        errMessage: 'Can not delete wallet with this account. Please try again'
                    });
                }
            } else {
                res.send({
                    errCode: 3,
                    data: null,
                    errMessage: 'Can not find any wallet belong to this account. Please try again'
                });
            }
        } else {
            res.send({
                errCode: 2,
                data: null,
                errMessage: 'Can not find any account or you do not have permission to delete all wallet'
            });
        }
    } catch(error) {
        globalFunc.writeLogFile('walletAPI-> get /wallet/user/userId/delete', __filename, 117, error);
        res.send({errCode: -1});
    }
});

module.exports = router;