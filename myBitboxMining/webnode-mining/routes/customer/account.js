var express = require('express');
var router = express.Router();
var CustomerManager = require('../../modelMgrs/CustomerManager');
var CustomerObj = require('../../models/Customer');
var EmailHelper = require('../../private/js/EmailHelper');
var FileHelper = require('../../private/js/FileHelper');

router.get('/login', function(req, res, next) {
    if (req.session.customer) return res.redirect('/');
    res.render('customer/login', {
        "title": "Customer Login"
    });
})
.post('/login', async (req, res, next) => {
    try {
        var customer = {
            email: req.body.email,
            password: req.body.password
        };
        var errorMessage = null;
        var customerMgr = new CustomerManager(req.app.locals._db);
        var customer = await customerMgr.getCustomerByEmailAndPassword(customer.email, customer.password);

        if (customer !== null) {
            if (customer.getActive() === 1 ) {
                req.session.customer = customer;
                return res.redirect('/');
            } else {
                errorMessage = 'Your account is not active. Please active before login';
            }
        } else {
            errorMessage = 'Incorrect username or password';
        }

        res.render('customer/login', {
            "title": "User Login",
            email: req.body.email,
            password: req.body.password,
            errorMessage: errorMessage
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

        var customerMgr = new CustomerManager(req.app.locals._db);
        if (await customerMgr.updateCustomer(new CustomerObj(customer)) < 0) {
            message = 'There is something error while trying to update your profile';
            isError = true;
        } else {
            req.session.customer = customer;
            message = 'Your profile is updated';
        }

        res.render('customer/profile', {
            "title" : "User Profile",
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
        "title" : "Register Account"
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
            birthday: req.body.birthday,
            phone: req.body.phone
        }

        errMessage.email = await CustomerManager.getCustomerByEmail(customer.email) !== null ? 'The email address is existed. Please try again' : null;
        errMessage.passwordconfirm = customer.password !== req.body.passwordconfirm ? 'The password confirm is incorrect. Please try again' : null;

        if (errMessage.email === null && errMessage.passwordconfirm === null) {
            var customerObj = new CustomerObj(customer);
            customerObj.setActive(0);
            var customerAdded = await CustomerMgr.addCustomer(customerObj);

            if (customerAdded < 0 && customerAdded.effectedRows < 0) {
                isError = true;
                errMessage.customer = 'Can not registered account. Please check all input field to make sure data is right';
            } else {
                var verifyUrl = FileHelper.getUrl(req, 'verifyaccount/' + FileHelper.encrypt(JSON.stringify(customerAdded)));
                var options = {
                    to: customer.email,
                    subject: '[myBitboxMining] Verify Account',
                    html: '<p>Please click in this link to active your personal account <a href="' + verifyUrl + '">Verify account</a></p>'
                }
                if (await new EmailHelper().sendEmail(options) !== null) {
                    message = 'Your account is created successully. Please check email to active';
                    return res.render('customer/registersuccess', {
                        title : 'Register Account',
                        message: message
                    });
                }
            }
        }

        res.render('customer/register', {
            title : 'Register Account',
            customer: customer,
            errMessage: errMessage,
            message: message,
            isError: isError
        });
    } catch(err) {
        console.log('error while trying to register account ' + err.message);
    }
});

router.get('/verifyaccount/:token', async (req, res) => {
    try {
        var message = '';
        if (req.params.token && req.params.token !== '') {
            var customerMgr = new CustomerManager(req.app.locals._db);
            var token = JSON.parse(FileHelper.decrypt(req.params.token.split('&')[0]));
            var customer = await customerMgr.getCustomerById(token.id);
            if (customer !== null && customer.getActive() === 0) {
                customer.setActive(1);
                if(await customerMgr.updateCustomerActive(customer) > 0) {
                    message = 'Your account is actived.';
                    return res.render('customer/verifysuccess', {
                        "title": "Verify Account",
                        message: message
                    });
                }
            }
        }
    } catch(err) {
        console.log('error while update active in field customer: ' + err.message);
    }

    res.redirect('/login');
});
module.exports = router;
