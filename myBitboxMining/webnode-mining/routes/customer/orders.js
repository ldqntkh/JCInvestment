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
const language = require('../../const/variableLabel');

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
                        "title": language.en.TITLE_CUSTOMER_ERROR_PAYMENT,
                        "fullname" : req.session.customer.fullname,
                        "menu_active" : 'not-found',
                        "error" : {
                            title : "Error",
                            message : error.response.message,
                            callback_url : {
                                href : '/',
                                desc : language.en.LABEL_DESC_BACK_DASHBOARD
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
                                    "title": language.en.TITLE_CUSTOMER_SUCCESS_PAYMENT,
                                    "fullname" : req.session.customer.fullname,
                                    "menu_active" : 'not-found',
                                    "error" : {
                                        title : language.en.TITLE_CUSTOMER_SUCCESS_PAYMENT,
                                        message : language.en.LABEL_PAYMENT_SUCCESS,
                                        callback_url : {
                                            href : '/orders/' + req.params.orderid,
                                            desc : language.en.LABEL_DESC_BACK_ORDER_DETAIL_PAGE
                                        }
                                    }
                                });
                            }
                        } else {
                            // payment fail
                            res.render('share_customer/error/error', {
                                "title": language.en.TITLE_CUSTOMER_ERROR_PAYMENT,
                                "fullname" : req.session.customer.fullname,
                                "error" : {
                                    title : language.en.TITLE_CUSTOMER_ERROR_PAYMENT,
                                    message : language.en.LABEL_PAYMENT_NOT_PAID,
                                    callback_url : {
                                        href : '/report',
                                        desc : language.en.LABEL_DESC_BACK_REPORT_PAGE
                                    }
                                }
                            });
                        }
                    } else {
                        // cannot create payment
                        // payment fail
                        res.render('share_customer/error/error', {
                            "title": language.en.TITLE_CUSTOMER_ERROR_PAYMENT,
                            "menu_active" : 'not-found',
                            "fullname" : req.session.customer.fullname,
                            "error" : {
                                title : "Error",
                                message : language.en.LABEL_PAYMENT_SAVE_ERROR,
                                callback_url : {
                                    href : '/report',
                                    desc : language.en.LABEL_DESC_BACK_REPORT_PAGE
                                }
                            }
                        });
                    }
                }
            });
            
        } else {
            res.render('share_customer/error/error', {
                "title": language.en.TITLE_CUSTOMER_ORDER_NOTFOUND,
                "fullname" : req.session.customer.fullname,
                "menu_active" : 'not-found',
                "error" : {
                    title : language.en.TITLE_CUSTOMER_ORDER_NOTFOUND,
                    message : language.en.LABEL_ORDER_NOTFOUND,
                    callback_url : {
                        href : '/my-order',
                        desc : language.en.LABEL_DESC_BACK_ORDER_PAGE
                    }
                }
            });
        }
    } catch (err) {
        console.log(err.message);
        res.render('share_customer/error/error', {
            "title": language.en.TITLE_CUSTOMER_404,
            "fullname" : req.session.customer.fullname,
            "menu_active" : 'not-found',
            "error" : {
                title : language.en.TITLE_CUSTOMER_404,
                message : err.message,
                callback_url : {
                    href : '/orders/my-order',
                    desc : language.en.LABEL_DESC_BACK_ORDER_PAGE
                }
            }
        });
    }
});

router.get('/orders/:orderid/buycancel', (req, res, next) => {
    if (!req.session.customer) res.redirect('/login');
    res.render('share_customer/error/error', {
        "title": language.en.TITLE_CUSTOMER_CANCEL_ORDER,
        "fullname" : req.session.customer.fullname,
        "menu_active" : 'not-found',
        "error" : {
            title : language.en.TITLE_CUSTOMER_CANCEL_ORDER,
            message : language.en.TITLE_CUSTOMER_CANCEL_ORDER,
            callback_url : {
                href : '/orders/' + req.params.orderid,
                desc : language.en.LABEL_DESC_BACK_ORDER_DETAIL_PAGE
            }
        }
    });
});

module.exports = router;