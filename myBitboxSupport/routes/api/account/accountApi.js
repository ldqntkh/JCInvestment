var express = require('express');
var router = express.Router();
const moment = require('moment')

var UserManager = require('../../../modelMgrs/UserManager');
var UserObject = require('../../../models/User');
var EmailObject = require('../../../configs/EmailObject');
const globalFunc = require('../../../globalFunctions');

/* POST login account */
router.post(['/login'], async (req, res, next) => {
    // data key: data
    try {
        let data = req.body.data;
        let {email, password} = data;
        let userMgr = new UserManager(req.app.locals._db);
        let userObj = await userMgr.getUserByEmail(email);
        
        if (userObj) {
            userObj = await userMgr.getUserByEmailAndPassword(email, password);
            if (userObj) {
                res.send({
                    errCode: 0,
                    data : userObj,
                    errMessage: null
                });
            } else {
                res.send({
                    errCode: 2,//err pass
                    data: null,
                    errMessage: 'incorrect password'
                });
            }
        } else {
            res.send({
                errCode: 1, // err email
                data: null,
                errMessage: 'email not found'
            });
        }
    } catch (err) {
        //console.log(err.message);
        globalFunc.writeLogFile('accountAPI-> post login: ', __filename, 41, err.message);
        res.send({
            errCode: 3, // server error
            data: null,
            errMessage: 'server error'
        });
    }
});

/**
* @function register account using method POST
* @param {Object} user
* @return {Object} response
* @Error code: 0 (return not error)
*              1 (return error while trying to insert new user)
*              2 (return error when email is already existed)
*             -1 (return error when server has some issues)
*/

router.post(['/register'], async (req, res) => {
    // data key: user
    try {
        let userMgr = new UserManager(req.app.locals._db);
        let user = req.body.user;
        let existedEmail = await userMgr.getUserByEmail(user.email);
        if (existedEmail) {
            res.send({
                errCode: 2,
                data : null,
                errMessage: 'the email ' + user.email + ' is already existed'
            });
        } else {
            let userObj = new UserObject(user);
            let result = await userMgr.addNewUser(userObj);
            if (result !== null && result.affectedRows > 0) {
                userObj.setUserId(result.userid);
                res.send({
                    errCode: 0,
                    data: userObj,
                    successMessage: 'The account is registered successfully'
                });
            } else {
                res.send({
                    errCode: 1,
                    data: null,
                    errMessage: 'Can not register account with ' + user.email
                });
            }
        }
    } catch(error) {
        //console.log(error.message);
        globalFunc.writeLogFile('accountAPI-> post register', __filename, 99, error);
        res.send({
            errCode: -1,
            data: null,
            errMessage: "the error message while registering account is: " + error.message
        });
    }
});

/**

 * @function change-password
 * @param {Object} // data: {token, password, newpassword}
 * @returns {number}
 * 0 - not error
 * 1 - request data is not valid
 * 2 - incorrect password
 * 3 - server error
 * 4 - Cannot update password
 */
router.post(['/user/change-password'], async (req, res, next) => {
    // data key: data
    try {
        let data = req.body.data;
        
        if (data == undefined || data.token == undefined || data.password == undefined || data.newpassword == undefined) {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'The request data is not valid'
            });
            return;
        }
        //decrypt the token
        let {token, password, newpassword} = data;
        let decryptToken = typeof token == 'string' ? JSON.parse(globalFunc.decrypt(token)) : {};
        let userMgr = new UserManager(req.app.locals._db);
        
        let userObj = await userMgr.getUserByEmailAndPassword(decryptToken.email, password);
        if (userObj) {
            userObj.setPassword(newpassword);
            let affectedRows = await userMgr.updateUserPassword(userObj);
            if (affectedRows > 0) {
                res.send({
                    errCode: 0,
                    data : userObj,
                    errMessage: null
                });
            } else {
                res.send({
                    errCode: 4,
                    data : null,
                    errMessage: 'Error => Cannot update password!'
                });
            }
        } else {
            res.send({
                errCode: 2,//err pass
                data: null,
                errMessage: 'incorrect password'
            });
        }
    } catch (err) {
        //console.log(err.message);
        globalFunc.writeLogFile('accountAPI-> post change-password: ', __filename, 161, err.message);
        res.send({
            errCode: 3, // server error
            data: null,
            errMessage: 'server error'
        });
    }
});

router.post(['/user/update-mydetails'], async (req, res, next) => {
    // data key: data
    try {
        let data = req.body.data;
        
        if (data == undefined || data.token == undefined || data.email == undefined || data.phone == undefined || data.fullname == undefined) {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'The request data is not valid'
            });
            return;
        }
        //decrypt the token
        let {token, email, phone, fullname} = data;
        let decryptToken = typeof token == 'string' ? JSON.parse(globalFunc.decrypt(token)) : {};
        let userMgr = new UserManager(req.app.locals._db);
        
        let userObj = await userMgr.getUserById(decryptToken.userId);
        if (userObj) {
            userObj.setEmail(email);
            userObj.setFullname(fullname);
            userObj.setPhoneNumber(phone);
            let affectedRows = await userMgr.updateUser(userObj);
            if (affectedRows > 0) {
                res.send({
                    errCode: 0,
                    data : userObj,
                    errMessage: null
                });
            } else {
                res.send({
                    errCode: 4,
                    data : null,
                    errMessage: 'Error => Cannot update account details!'
                });
            }
        } else {
            res.send({
                errCode: 2,//err pass
                data: null,
                errMessage: 'Error => Cannot find your account'
            });
        }
    } catch (err) {
        //console.log(err.message);
        globalFunc.writeLogFile('accountAPI-> post update my account: ', __filename, 226, err.message);
        res.send({
            errCode: 3, // server error
            data: null,
            errMessage: 'server error'
        });
    }
});
/*
* @function register account using method POST
* @param {Object} user
* @return {Object} response
* @Error code: 0 (return not error)
*              1 (return error when email account is not existed)
*              2 (return error when email is not sent successfully)
*              3 (return error while trying to update new password)
*              4 (return error when not input new password)
*              5 (return error when not find user token)
*              6 (return error while trying to update user token)
*             -1 (return error when server has some issues)
*/

router.post(['/user/resetpassword'], async (req, res) => {
    try {
        let data = req.body.data ? req.body.data : '';
        if (data != '') {
            let email = data.email ? data.email : '';
            let tokenClient = data.token ? data.token : '';
            let userManager = new UserManager(req.app.locals._db);
            let existedUser = await userManager.getUserByEmail(email);
            if (existedUser == null) {
                return res.send({
                    errCode: 1,
                    data: null,
                    errMessage: 'Can not find your email account. Please try again'
                });
            }
            let userObj = new UserObject(existedUser);
            if (tokenClient == '') {
                let randomNumber = Math.floor(Math.random() * 899999 + 100000);
                let tokenServer = globalFunc.encrypt(randomNumber.toString());
                userObj.setToken(tokenServer);
                if (await userManager.updateUser(userObj) > 0) {
                    let emailObject = new EmailObject();
                    let mailOptions = {
                        from: '<phat.le@isobar.com>', // sender address
                        to: email, // list of receivers
                        subject: '[Mybitbox] Reset password', // Subject line
                        html: '<b>Hello! Your token is: ' + tokenServer + '</b>' // html body
                    }

                    if (emailObject.sendEmail(mailOptions) != '') {
                        res.send({
                            errCode: 0,
                            data: existedUser,
                            successMessage: 'Email is sent successfully'
                        });
                    } else {
                        res.send({
                            errCode: 2,
                            data: null,
                            errMessage: 'Email is not sent successfully'
                        });
                    }
                }
            } else {
                //if client send token to server, it will be step send email
                if (await userManager.getUserByEmailAndToken(tokenClient, email) != null) {
                    let newpassword = data.newpassword ? data.newpassword : '';
                    if (newpassword == '') {
                        return res.send({
                            errCode: 4,
                            data: null,
                            errMessage: 'Please input new password'
                        });
                    }
                    // update user password
                    userObj.setPassword(data.newpassword);
                    if (await userManager.updateUserPassword(userObj) > 0) {
                        res.send({
                            errCode: 0,
                            data: userObj,
                            errMessage: null
                        });
                    } else {
                        res.send({
                            errCode: 3,
                            data: null,
                            errMessage: 'Can not reset your password. Please try again'
                        });
                    }
                } else {
                    res.send({
                        errCode: 5,
                        data: null,
                        errMessage: 'Can not find your token. Please try again'
                    })
                }
            }
        }
    } catch(error) {
        globalFunc.writeLogFile('accountAPI-> reset password', __filename, 99, error);
        res.send({
            errCode: -1,
            data: null,
            errMessage: "the error message while reset user password: " + error.message
        });
    }
});
module.exports = router;
