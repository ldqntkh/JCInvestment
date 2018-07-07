var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');

// import class manager
const OrderManager = require('../../modelMgrs/OrderManager');
const PaymentDetailsManager = require('../../modelMgrs/PaymentDetailsManager');
const CustomerHistoryManager = require('../../modelMgrs/CustomerHistoryManager');
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager');

// import model
const PaymentDetailsModel = require('../../models/PaymentDetails');
const CustomerHistoryModel = require('../../models/CustomerHistory');
const ProductOfCustomerModel = require('../../models/ProductOfCustomer');

// import const
const varibale = require('../../const/variable');
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/my-order/', async(req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    res.render('customer/order/index', {
        "title" : showMessage('TITLE_CUSTOMER_ORDER'),
        "menu_active" : 'my-order',
        "fullname" : req.session.customer.fullname
    })
})

router.get('/orders/:orderid/buysuccess', async (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    let customer = req.session.customer;
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
                        "title": showMessage('TITLE_CUSTOMER_ERROR_PAYMENT'),
                        "fullname" : req.session.customer.fullname,
                        "menu_active" : 'not-found',
                        "error" : {
                            title : "Error",
                            message : error.response.message,
                            callback_url : {
                                href : '/',
                                desc : showMessage('LABEL_DESC_BACK_DASHBOARD')
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
                        // insert history
                        await CustomerHistoryManager.createHistory(new CustomerHistoryModel({
                            customerId : customer.id,
                            description : showMessage('LABEL_CREATE_PAYMENT',
                                            "<a class='history' href='/payments/" + paymentDetails.getPaymentId() + "'>" + paymentDetails.getPaymentId() + "</a>",
                                            "<a class='history' href='/orders/" + order.getOrderId() + "'>" + order.getOrderId() + "</a>"),
                            createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                        }));

                        if (paymentDetails.getState() === varibale.PAYMENT_APPROVED) {
                            // update order state
                            order.setState(varibale.ORDER_APPROVED);
                            order.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                            let result = await OrderManager.updateOrder(order);
                            if (result !== -1) {
                                // insert history
                                await CustomerHistoryManager.createHistory(new CustomerHistoryModel({
                                    customerId : customer.id,
                                    description : showMessage('LABEL_ORDER_APPROVE',
                                                    "<a class='history' href='/orders/" + order.getOrderId() + "'>" + order.getOrderId() + "</a>"),
                                    createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                }));
                                // create product of customer
                                let productofctm = await ProductOfCustomerManager.createProduct(new ProductOfCustomerModel({
                                    name : order.getProductName(),
                                    hashrate : order.getHashrate(),
                                    customerId : customer.id,
                                    period : order.getProductPeriod(),
                                    createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                }));

                                if (productofctm !== null) {
                                    // insert history
                                    await CustomerHistoryManager.createHistory(new CustomerHistoryModel({
                                        customerId : customer.id,
                                        description : showMessage('LABEL_PRODUCTOFCUSTOMER_INSERT')
                                                        .replace('{0}', "<a class='history' href='/product-customer/" + productofctm.getProductId() + "'>" + productofctm.getProductId() + "</a>"),
                                        createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                    }));
                                }

                                res.render('share_customer/error/error', {
                                    "title": showMessage('TITLE_CUSTOMER_SUCCESS_PAYMENT'),
                                    "fullname" : req.session.customer.fullname,
                                    "menu_active" : 'not-found',
                                    "error" : {
                                        title : showMessage('TITLE_CUSTOMER_SUCCESS_PAYMENT'),
                                        message : showMessage('LABEL_PAYMENT_SUCCESS'),
                                        callback_url : {
                                            href : '/orders/' + req.params.orderid,
                                            // change desc
                                            desc : showMessage('LABEL_DESC_BACK_ORDER_DETAIL_PAGE')
                                        }
                                    }
                                });
                            }
                        } else {
                            // payment fail
                            res.render('share_customer/error/error', {
                                "title": showMessage('TITLE_CUSTOMER_ERROR_PAYMENT'),
                                "fullname" : req.session.customer.fullname,
                                "error" : {
                                    title : showMessage('TITLE_CUSTOMER_ERROR_PAYMENT'),
                                    message : showMessage('LABEL_PAYMENT_NOT_PAID'),
                                    callback_url : {
                                        href : '/report',
                                        desc : showMessage('LABEL_DESC_BACK_REPORT_PAGE')
                                    }
                                }
                            });
                        }
                    } else {
                        // cannot create payment
                        // payment fail
                        res.render('share_customer/error/error', {
                            "title": showMessage('TITLE_CUSTOMER_ERROR_PAYMENT'),
                            "menu_active" : 'not-found',
                            "fullname" : req.session.customer.fullname,
                            "error" : {
                                title : "Error",
                                message : showMessage('LABEL_PAYMENT_SAVE_ERROR'),
                                callback_url : {
                                    href : '/report',
                                    desc : showMessage('LABEL_DESC_BACK_REPORT_PAGE')
                                }
                            }
                        });
                    }
                }
            });
            
        } else {
            res.render('share_customer/error/error', {
                "title": showMessage('TITLE_CUSTOMER_ORDER_NOTFOUND'),
                "fullname" : req.session.customer.fullname,
                "menu_active" : 'not-found',
                "error" : {
                    title : showMessage('TITLE_CUSTOMER_ORDER_NOTFOUND'),
                    message : showMessage('LABEL_ORDER_NOTFOUND'),
                    callback_url : {
                        href : '/my-order',
                        desc : showMessage('LABEL_DESC_BACK_ORDER_PAGE')
                    }
                }
            });
        }
    } catch (err) {
        console.log(err.message);
        res.render('share_customer/error/error', {
            "title": showMessage('TITLE_CUSTOMER_404'),
            "fullname" : req.session.customer.fullname,
            "menu_active" : 'not-found',
            "error" : {
                title : showMessage('TITLE_CUSTOMER_404'),
                message : err.message,
                callback_url : {
                    href : '/orders/my-order',
                    desc : showMessage('LABEL_DESC_BACK_ORDER_PAGE')
                }
            }
        });
    }
});

router.get('/orders/:orderid/buycancel', (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    res.render('share_customer/error/error', {
        "title": showMessage('TITLE_CUSTOMER_CANCEL_ORDER'),
        "fullname" : req.session.customer.fullname,
        "menu_active" : 'not-found',
        "error" : {
            title : showMessage('TITLE_CUSTOMER_CANCEL_ORDER'),
            message : showMessage('TITLE_CUSTOMER_CANCEL_ORDER'),
            callback_url : {
                href : '/orders/' + req.params.orderid,
                desc : showMessage('LABEL_DESC_BACK_ORDER_DETAIL_PAGE')
            }
        }
    });
});

module.exports = router;