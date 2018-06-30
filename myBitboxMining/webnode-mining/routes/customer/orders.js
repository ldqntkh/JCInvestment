var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');
// import class manager
const OrderManager = require('../../modelMgrs/OrderManager');
const PaymentDetailsManager = require('../../modelMgrs/PaymentDetailsManager')

// import model
const PaymentDetailsModel = require('../../models/PaymentDetails');

// import const
const varibale = require('../../const/variable');

router.get('/orders/:orderid/buysuccess', async (req, res, next) => {
    if (!req.session.customer) res.redirect('/login');

    let orderid = req.params.orderid;
    try {
        let order = await OrderManager.getOrderById(orderid);
        if (order !== null) {
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;

            const execute_payment_json = {
                "payer_id": payerId,
                "transactions": [{
                    "amount": {
                        "currency": order.getCurrency(),
                        "total": order.getAmount().toString()
                    }
                }]
            };

            req.app.locals.paypal.payment.execute(paymentId, execute_payment_json, async function (error, payment) {
                if (error) {
                    console.log(error.response);
                    res.render('share_customer/error/error', {
                        "title": "Error Payment",
                        "fullname" : req.session.customer.fullname,
                        "menu_active" : 'not-found',
                        "error" : {
                            title : "Error",
                            message : error.response.message,
                            callback_url : {
                                href : '/',
                                desc : 'Click to back dashboard page'
                            }
                        }
                    });
                } else {
                    console.log("Get Payment Response");
                    // create payment detail
                    let paymentDetailsModel = new PaymentDetailsModel({
                        id : payment.id,
                        orderid : order.getOrderId(),
                        payment_method: payment.payer.payment_method,
                        email : payment.payer.payer_info.email,
                        firstname : payment.payer.payer_info.first_name,
                        lastname : payment.payer.payer_info.last_name,
                        payerid : payment.payer.payer_info.payer_id,
                        countrycode : payment.payer.payer_info.country_code,
                        state : payment.state,
                        cart : payment.cart,
                        createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                    })
                    let paymentDetails = await PaymentDetailsManager.createPaymentDetails(paymentDetailsModel);
                    if (paymentDetails !== null) {
                        if (paymentDetails.getState() === varibale.PAYMENT_APPROVED) {
                            // update order state
                            order.setState(varibale.ORDER_APPROVED);
                            order.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                            let result = await OrderManager.updateOrder(order);
                            if (result !== -1) {
                                // create history,
                                // create product of customer

                                res.render('share_customer/error/error', {
                                    "title": "Payment Success",
                                    "fullname" : req.session.customer.fullname,
                                    "menu_active" : 'not-found',
                                    "error" : {
                                        title : "Payment success",
                                        message : "You've successfully paid your order",
                                        callback_url : {
                                            href : '/orders/' + req.params.orderid,
                                            desc : 'Please click here go to order detail page.'
                                        }
                                    }
                                });
                            }
                        } else {
                            // payment fail
                            res.render('share_customer/error/error', {
                                "title": "Payment fail",
                                "fullname" : req.session.customer.fullname,
                                "error" : {
                                    title : "Error",
                                    message : "It looks like your bill has not been paid. Please contact your provider or leave requests for our check.",
                                    callback_url : {
                                        href : '/report',
                                        desc : 'Please click here go to report page.'
                                    }
                                }
                            });
                        }
                    } else {
                        // cannot create payment
                        // payment fail
                        res.render('share_customer/error/error', {
                            "title": "Error Payment",
                            "menu_active" : 'not-found',
                            "fullname" : req.session.customer.fullname,
                            "error" : {
                                title : "Error",
                                message : "We will check this issue. Maybe this is our fault.",
                                callback_url : {
                                    href : '/report',
                                    desc : 'Please click here go to report page.'
                                }
                            }
                        });
                    }
                }
            });
            
        } else {
            res.render('share_customer/error/error', {
                "title": "Error not found",
                "fullname" : req.session.customer.fullname,
                "menu_active" : 'not-found',
                "error" : {
                    title : "Error",
                    message : "Can not find your order. Please check again",
                    callback_url : {
                        href : '/my-order',
                        desc : 'Please click here go to my order page.'
                    }
                }
            });
        }
    } catch (err) {
        console.log(err.message);
        res.render('share_customer/error/error', {
            "title": "Error 404",
            "fullname" : req.session.customer.fullname,
            "menu_active" : 'not-found',
            "error" : {
                title : "Error 404",
                message : err.message,
                callback_url : {
                    href : '/orders/my-order',
                    desc : 'Please click here go to my order page.'
                }
            }
        });
    }
});

router.get('/orders/:orderid/buycancel', (req, res, next) => {
    if (!req.session.customer) res.redirect('/login');
    res.render('share_customer/error/error', {
        "title": "Cancel Order",
        "fullname" : req.session.customer.fullname,
        "menu_active" : 'not-found',
        "error" : {
            title : "Cancel order",
            message : "You have canceled this invoice",
            callback_url : {
                href : '/orders/' + req.params.orderid,
                desc : 'Please click here go to order detail page.'
            }
        }
    });
});

module.exports = router;