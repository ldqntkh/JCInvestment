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
});

module.exports = router;
