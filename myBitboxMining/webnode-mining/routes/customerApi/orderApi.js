var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import file helper
const showMessage = require('../../global/ResourceHelper').showMessage;

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
                status: 'fail',
                data : null,
                errMessage : showMessage('ERROR_AUTHENTICATION')
            });
        } else {
            let results = await PaymentDetailManager.getPaymentDetailByFields({
                orderid : req.params.orderId
            });
            results[0].createAt = moment(new Date(results[0].createAt)).format('DD/MM/YYYY');
            res.send({
                status: 'success',
                data : results.length > 0 ? results[0] : null,
                errMessage : null
            });
        }
    } catch(err) {
        console.log(err.message);
        res.send({
            status: 'fail',
            data : null,
            errMessage : err.message
        });
    }
})
.get('/:orderId/delete', async (req, res, nex) => {
    let errMessage = showMessage('ERROR_CANNOT_REMOVE_ORDER');
    try {
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: 'fail',
                data : null,
                errMessage : showMessage('ERROR_AUTHENTICATION')
            });
        } else {
            let results = await OrderManager.deleteOrder({id: req.params.orderId});
            if (results !== '') {
                return res.send({
                    status: 'success',
                    data: null,
                    errMessage: errMessage
                })
            }
        }
    } catch(err) {
        console.log(err.message);
    }
    res.send({
        status: 'fail',
        data : null,
        errMessage : errMessage
    });
});

module.exports = router;