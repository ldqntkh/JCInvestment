var express = require('express');
var router = express.Router();
var CustomerManager = require('../../modelMgrs/CustomerManager');
var CustomerObj = require('../../models/Customer');
var TokenManager = require('../../modelMgrs/TokenManager');
var TokenObj = require('../../models/Token');
var EmailHelper = require('../../global/EmailHelper');
var FileHelper = require('../../global/FileHelper');

// import const
const showMessage = require('../../global/FileHelper').showMessage;

router.get('/login', function(req, res, next) {
    if (req.session.customer) return res.redirect('/');
    res.render('customer/login', {
        "title": showMessage('TITLE_CUSTOMER_LOGIN')
    });
})
.post('/login', async (req, res, next) => {
    try {
        var customer = {
            email: req.body.email,
            password: req.body.password
        };
        var message = null;
        var customer = await CustomerManager.getCustomerByField({
            email: customer.email,
            password: FileHelper.crypto(customer.password)
        });

        if (customer !== null) {
            if (customer.getActive() === 1 ) {
                req.session.customer = customer;
                return res.redirect('/');
            } else {
                message = showMessage('WARNING_ACCOUNT_NOT_ACTIVE');
            }
        } else {
            message = showMessage('ERROR_INCORRECT_ACCOUNT');
        }

        res.render('customer/login', {
            "title": showMessage('TITLE_CUSTOMER_LOGIN'),
            email: req.body.email,
            password: req.body.password,
            message: message
        });
    } catch(err) {
        console.log(err);
    }
});

router.post('/editprofile', async (req, res) => {
    try {
        if (!req.session.customer) return res.redirect('/login');
        var customer = {
            id: req.session.customer.id,
            email: req.session.customer.email,
            fullname: req.body.fullname,
            birthday: req.body.birthday,
            phone: req.body.phone
        };
        var message = '',
            isError = false;

        if (await CustomerManager.updateCustomer(new CustomerObj(customer), {id: customer.id}) < 0) {
            message = showMessage('ERROR_UPDATE_PROFILE');
            isError = true;
        } else {
            req.session.customer = customer;
            message = showMessage('LABEL_PROFILE_UPDATED');
        }

        res.render('customer/profile', {
            "title" : showMessage('TITLE_CUSTOMER_UPDATE_PROFILE'),
            "menu_active": "user",
            "customer": req.session.customer,
            "fullname" : req.session.customer.fullname,
            "message": message,
            "isError": isError
        });
    } catch(err) {
        console.log(err);
    }
})
.get('/registeraccount', (req, res) => {
    res.render('customer/register', {
        "title" : showMessage('TITLE_CUSTOMER_REGISTER')
    });
})
.post('/registeraccount', async (req, res) => {
    try {
        var errMessage = {}, message = '';
        var isError = false;
        var customer = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
            birthday: req.body.birthday !== '' ? req.body.birthday : null,
            phone: req.body.phone,
            active: 0
        }

        errMessage.email = await CustomerManager.getCustomerByField({email: customer.email}) !== null ? showMessage('WARNING_EMAIL_EXISTS') : null;
        errMessage.passwordconfirm = customer.password !== req.body.passwordconfirm ? showMessage('ERROR_PASS_CONFIRM_INCORRECT') : null;

        if (errMessage.email === null && errMessage.passwordconfirm === null) {
            var customerObj = new CustomerObj(customer);
            var customerAdded = await CustomerManager.addCustomer(customerObj);
            if (customerAdded === null) {
                isError = true;
                errMessage.customer = showMessage('ERROR_NOT_CREATE_ACCOUNT');
            } else {
                var verifyUrl = FileHelper.getUrl(req, 'verifyaccount/' + FileHelper.encrypt(JSON.stringify(customerAdded)));
                var options = {
                    to: customer.email,
                    subject: showMessage('LABEL_SUBJECT_VERIFY_ACCOUNT'),
                    html: showMessage('LABEL_HTML_VERIFY_ACCOUNT',verifyUrl)
                }
                if (await new EmailHelper().sendEmail(options) !== null) {
                    message = showMessage('SUCCESS_CREATE_ACCOUNT');
                    return res.render('customer/registersuccess', {
                        title :  showMessage('TITLE_CUSTOMER_REGISTER'),
                        message: message
                    });
                }
            }
        }

        res.render('customer/register', {
            title : showMessage('TITLE_CUSTOMER_REGISTER'),
            customer: customer,
            errMessage: errMessage,
            message: message,
            isError: isError
        });
    } catch(err) {
        console.log(showMessage('ERROR_REGISTER_ACCOUNT') + err.message);
    }
});

router.get('/verifyaccount/:token', async (req, res) => {
    try {
        var message = '';
        if (req.params.token && req.params.token !== '') {
            var token = JSON.parse(FileHelper.decrypt(req.params.token.split('&')[0]));
            var customer = await CustomerManager.getCustomerByField({id: token.id});
            if (customer !== null && customer.getActive() === 0) {
                customer.setActive(1);
                if(await CustomerManager.updateCustomer(customer) > 0) {
                    message = showMessage('LABEL_ACCOUNT_ACTIVED');
                    return res.render('customer/verifysuccess', {
                        "title": showMessage('TITLE_CUSTOMER_VERIFY_ACCOUNT'),
                        message: message
                    });
                }
            }
        }
    } catch(err) {
        console.log(showMessage('ERROR_CUSTOMER_UPDATE_ACTIVE') + err.message);
    }

    res.redirect('/login');
});

router.post('/resetpassword', async (req, res) => {
    try {
        let message = '', errCode = 1;
        let email = req.body.email ? req.body.email : '';
        let customer = await CustomerManager.getCustomerByField({email: email});
        if (customer === null) {
            message = showMessage('ERROR_EMAIL_NOTFOUND');
        } else if(customer.getActive() === 0) {
            message = showMessage('ERROR_ACCOUNT_NOTACTIVE');
        } else {
            let tokenServer = FileHelper.encrypt(FileHelper.getRandomNumber().toString() + email);
            let subjectMail = showMessage('LABEL_SUBJECT_RESET_PASS');
            let html = showMessage('LABEL_HTML_RESET_PASS',FileHelper.getUrl(req, 'changepassword/' + tokenServer));
            let mailOptions = FileHelper.getEmailOptions(email, subjectMail, html);
            let existedToken = await TokenManager.getTokenByField({email: email});

            if (existedToken !== null && existedToken.getName() !== null) {
                if (FileHelper.isTimeout(existedToken.getCreateAt(), 2)) {
                    message = showMessage('ERROR_TOKEN_EXPIRED');
                } else {
                    errCode = 0;
                    existedToken.setName(tokenServer);
                    await TokenManager.updateToken(existedToken);
                }
            } else {
                errCode = 0;
                await TokenManager.addToken(new TokenObj({
                    email: customer.getEmail(),
                    name: tokenServer
                }));
            }

            if (errCode === 0) {
                if (await new EmailHelper().sendEmail(mailOptions) !== null) {
                    errCode = 0;
                    message = showMessage('LABEL_CHECKMAIL_TOKEN');
                } else {
                    message = showMessage('ERROR_SEND_MAIL');
                }
            }
        }
        return res.send({
            errCode: errCode,
            message: message
        });
    } catch(err) {
        console.log(showMessage('ERROR_SV_RESET_PASS') + err.message);
    }
    res.send({});
});

router.get('/changepassword/:token', async (req, res) => {
    try {
        let token = req.params.token.split('&')[0];
        let existedToken = await TokenManager.getTokenByField({name: token});
        if (existedToken !== null) {
            return res.render('customer/changepassword', {
                "title": showMessage('TITLE_CUSTOMER_CHANGEPASS')
            });
        } else {
            return res.render('customer/login', {
                title: showMessage('TITLE_CUSTOMER_LOGIN'),
                errorMessage: showMessage('ERROR_TOKEN_NOT_EXISTS')
            });
        }
    } catch(err) {
        console.log(showMessage('ERROR_CHANGE_PASS') + err.message);
    }
    res.send();
})
.post('/changepassword/:token', async (req, res) => {
    try {
        let token = req.params.token.split('&')[0];
        let password = req.body.password;
        let existedToken = await TokenManager.getTokenByField({name: token});
        if (existedToken !== null) {
            let customer = await CustomerManager.getCustomerByField({email: existedToken.getEmail()});
            customer.setPassword(FileHelper.crypto(password));
            await CustomerManager.updateCustomer(customer);
            return res.render('customer/login', {
                title: showMessage('TITLE_CUSTOMER_LOGIN'),
                message: showMessage('WARNING_PASS_CHANGED'),
                errorCode: 0
            });
        }
    } catch(err) {
        console.log(showMessage('ERROR_CHANGE_PASS') + err.message);
    }
    res.send();
});
module.exports = router;
