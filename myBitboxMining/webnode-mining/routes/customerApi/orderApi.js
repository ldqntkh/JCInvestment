var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const OrderManager = require('../../modelMgrs/OrderManager');
const PaymentDetailManager = require('../../modelMgrs/PaymentDetailsManager');

router.get('/list', async (req, res, next) => {
    try {
        // check session or token
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let result = await OrderManager.getOrderByFields({
                customerId : req.session.customer.id
            });
            res.send({
                status: "success",
                data : result,
                errMessage : null
            });
        }
    } catch(err) {
        console.log(err.message);
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
})
.get('/:orderId/payment-detail', async (req, res, next) => {
    try {
        // check session or token
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let results = await PaymentDetailManager.getPaymentDetailByFields({
                orderid : req.params.orderId
            });
            results[0].createAt = moment(new Date(results[0].createAt)).format('DD/MM/YYYY');
            res.send({
                status: "success",
                data : results.length > 0 ? results[0] : null,
                errMessage : null
            });
        }
    } catch(err) {
        console.log(err.message);
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
})

module.exports = router;