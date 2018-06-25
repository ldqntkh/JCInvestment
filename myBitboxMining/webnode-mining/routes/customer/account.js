var express = require('express');
var router = express.Router();
var CustomerManager = require('../../modelMgrs/CustomerManager');
var CustomerObj = require('../../models/Customer');

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
            req.session.customer = customer;
            return res.redirect('/');
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
            message = 'Your profile is updated';
        }

        res.render('customer/profile', {
            "title" : "User Profile",
            "menu_active": "user",
            "customer": customer,
            "message": message,
            "isError": isError
        });
    } catch(err) {
        console.log(err);
    }
})
.get('/registeraccount', function(req, res) {
    res.render('customer/register', {
        "title" : "Register Account"
    });
})
.post('/registerform', async (req, res) => {
    try {
        var errMessage = {};
        var customerMgr = new CustomerManager(req.app.locals._db);
        var customer = {
            email: req.body.email,
            fullname: req.body.fullname,
            password: req.body.password,
            passwordconfirm: req.body.passwordconfirm,
            birthday: req.body.birthday === '' ? 0 : req.body.birthday,
            phone: req.body.phone
        }

        errMessage.email = await customerMgr.getCustomerByEmail(customer.email) !== null ? 'The email address is existed. Please try again' : null;
        errMessage.passwordconfirm = customer.password !== customer.passwordconfirm ? 'The password confirm is incorrect. Please try again' : null;

        if (errMessage.email !== null && errMessage.passwordconfirm !== null) {
            var customerObj = new CustomerObj(customer);
            customerObj.setActive(0);
            var customerAdded = await customerMgr.addCustomer(customerObj);
            if (customerAdded.effectedRows < 0) {
                errMessage.customer = 'Can not registered account. Please check all input field to make sure data is right';
            }
        }

        res.render('customer/register', {
            title : 'Register Account',
            customer: customer,
            errMessage: errMessage
        });
    } catch(err) {
        console.log('error in router registerform ' + err.message);
    }
});
module.exports = router;
