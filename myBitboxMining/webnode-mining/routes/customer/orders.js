var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');

// import class manager
const OrderManager = require('../../modelMgrs/OrderManager');
const PaymentDetailsManager = require('../../modelMgrs/PaymentDetailsManager');
const CustomerHistoryManager = require('../../modelMgrs/CustomerHistoryManager');
const ProductOfCustomerManager = require('../../modelMgrs/ProductOfCustomerManager');
const PriceBookManager = require('../../modelMgrs/PriceBookManager');

// import model
const PaymentDetailsModel = require('../../models/PaymentDetails');
const CustomerHistoryModel = require('../../models/CustomerHistory');
const ProductOfCustomerModel = require('../../models/ProductOfCustomer');

// import const
const varibale = require('../../const/variable');
const showMessage = require('../../global/ResourceHelper').showMessage;

// import library
const PaypalManager = require('../../library/PaymentPaypal');

router.get(/^\/(my-order)/, async(req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    res.render('customer/order/index', {
        "title" : showMessage('TITLE_CUSTOMER_ORDER'),
        "menu_active" : 'my-order',
        "fullname" : req.session.customer.fullname
    })
})

router.get('/orders/:orderid/buysuccess/:productId', async (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    let customer = req.session.customer;
    let orderid = req.params.orderid;
    try {
        let order = await OrderManager.getOrderById(orderid);
        if (order !== null) {
            const payerId = req.query.PayerID;
            const paymentId = req.query.paymentId;

            PaypalManager.CreateExecutePaymentJson(
                payerId,
                order.getCurrency(),
                order.getAmount()
            );

            PaypalManager.getPaypalPayment().execute(paymentId, PaypalManager.getPaypalExecuteJson(), async function (error, payment) {
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
                    //console.log("Get Payment Response");
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
                            description : showMessage('LABEL_CREATE_PAYMENT', [
                                            "<a class='history' href='/my-order/" + order.getOrderId() + "/detail'>" + paymentDetails.getPaymentId() + "</a>",
                                            "<a class='history' href='/my-order/" + order.getOrderId() + "/detail'>" + order.getOrderId() + "</a>"]),
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
                                    description : showMessage('LABEL_ORDER_APPROVE', ["<a class='history' href='/my-order/" + order.getOrderId() + "/detail'>" + order.getOrderId() + "</a>"]),
                                    createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                }));
                                // create product of customer
                                let productId = req.params.productId;
                                let priceBook = await PriceBookManager.getPriceBook({
                                    localeId: 'en',
                                    productId: productId
                                });

                                var fee = 0;
                                if (priceBook !== null) {
                                    fee = priceBook.getMaintenanceFee();
                                }
                                let productofctm = await ProductOfCustomerManager.createProduct(new ProductOfCustomerModel({
                                    name : order.getProductName(),
                                    hashrate : order.getHashrate(),
                                    customerId : customer.id,
                                    period : order.getProductPeriod(),
                                    maintenance_fee : fee,
                                    createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
                                }));

                                if (productofctm !== null) {
                                    // insert history
                                    await CustomerHistoryManager.createHistory(new CustomerHistoryModel({
                                        customerId : customer.id,
                                        description : showMessage('LABEL_PRODUCTOFCUSTOMER_INSERT', [
                                            "<a class='history' href='/my-product/" + productofctm.getProductId() + "'>" + productofctm.getProductId() + "</a>",
                                            "<a class='history' href='/my-product/" + productofctm.getProductId() + "'>" + showMessage('TITLE_HERE') + "</a>"
                                        ]),
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
                                            href : '/my-order/' + req.params.orderid + '/detail',
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
                href : '/my-order/' + req.params.orderid + '/detail',
                desc : showMessage('LABEL_DESC_BACK_ORDER_DETAIL_PAGE')
            }
        }
    });
});

module.exports = router;