var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');

// import class manager
const MaintenanceFeeManager = require('../../modelMgrs/MaintenanceFeeManager');

// import const
const varibale = require('../../const/variable');
const FileHelper = require('../../global/FileHelper');
const showMessage = require('../../global/ResourceHelper').showMessage;

// import library
const PaypalManager = require('../../library/PaymentPaypal');

router.get('/maintenance-fee', (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    res.render('customer/maintenanceFee/index', {
        "title" : showMessage('TITLE_CUSTOMER_MAINTAINCE_FEE'),
        "menu_active" : 'maintenance-fee',
        "fullname" : req.session.customer.fullname
    })
});

router.post("/maintenance-paid-paypal", (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    // get total fee
    let maintain = await MaintenanceFeeManager.getTotalMaintainFeeByField({
        customerId : req.session.customer.id,
        status: false
    });
    
    if (maintain !== null) {
        // create payment paypal
        PaypalManager.CreatePaymentJson(
            returnUrl = FileHelper.getUrl(req, "maintenance-fee/paidsuccess"),
            cancelUrl = FileHelper.getUrl(req, "maintenance-fee/paidfail"),
            itemList = [{
                "name": showMessage('TITLE_PAID_MAINTAIN_FEE'),
                "sku": "maintainfee",
                "price": maintain.getAmount().toString(),
                "currency": maintain.getCurrency(),
                "quantity": 1
            }],
            currency = maintain.getCurrency(),
            amount = maintain.getAmount(),
            description = maintain.getDescription()
        )
    }
});

router.get('/maintenance-fee/:maintain_fee_id/paidsuccess', (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    // get maintain fee record
    let maintain_fee_id = req.params.maintain_fee_id;
    try {
        let maintain = MaintenanceFeeManager.getTotalMaintainFeeByField({
            id: maintain_fee_id
        });
        if (maintain !== null) {
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;

            PaypalManager.CreateExecutePaymentJson(
                payerId,
                maintain.getCurrency(),
                maintain.getAmount()
            );
            PaypalManager.getPaypalPayment().execute(paymentId, PaypalManager.getPaypalExecuteJson(), async function (error, payment) {

            });
        }
    } catch(err) {

    }
});
module.exports = router;
