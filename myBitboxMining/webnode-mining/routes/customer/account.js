var express = require('express');
var router = express.Router();
var CustomerManager = require('../../modelMgrs/CustomerManager');
var db = require('../../modelMgrs/Database');

router.get('/login', function(req, res, next) {
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
        var customerMgr = new CustomerManager(new db());
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

module.exports = router;
