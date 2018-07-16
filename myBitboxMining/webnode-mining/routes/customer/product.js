var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');
const OrderManager = require('../../modelMgrs/OrderManager');
const CustomerHistoryManager = require('../../modelMgrs/CustomerHistoryManager');

// import model
const OrderModel = require('../../models/Order');
const CustomerHistoryModel = require('../../models/CustomerHistory');

// import const
const varibale = require('../../const/variable');
const FileHelper = require('../../global/FileHelper');
const showMessage = require('../../global/ResourceHelper').showMessage;

router.post('/products/:productid/buy', async (req, res, next)=> {
    /**
     * create order
     * create history
     * create payment
     */
    if (!req.session.customer) return res.redirect('/login');
    let customer = req.session.customer;
    /**
     * get product
     * post to paypal
     * create order
     */
    let productId = req.params.productid;
    let product = await ProductManager.getProductById({
        id: productId
    });
    let quantity = 1;
    if (product !== null) {
        let price = product.getSalePrice() !== null ? product.getSalePrice() : product.getPrice();

        // create order
        console.log("Create Order");
        let order = new OrderModel({
            customerid : customer.id,
            productname: product.getProductName(),
            hashrate : product.getHashrate(),
            quantity: 1,
            description : showMessage('LABEL_BUY_PRODUCT', [product.getProductName(), product.getCurrency() + (price * quantity).toString()]),
            state : varibale.ORDER_CREATE,
            amount : price * 1,
            currency : product.getCurrency(),
            product_period : product.getPeriod(),
            createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
        });
        let orderResult = await OrderManager.createOrder(order);

        if (orderResult !== null) {

            // insert history
            let history = new CustomerHistoryModel({
                customerId : customer.id,
                description : showMessage('LABEL_CREATE_ORDER', ["<a class='history' href='/my-order/" + orderResult.getOrderId() + "/detail'>" + orderResult.getOrderId() + "</a>"]),
                createAt : moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
            });
            CustomerHistoryManager.createHistory(history);

            const create_payment_json = {
                "intent": "sale",
                // support payment paypal
                "payer": {
                    "payment_method": "paypal"
                },
                "redirect_urls": {
                    "return_url": FileHelper.getUrl(req, "orders/" + orderResult.getOrderId() + "/buysuccess"),
                    "cancel_url": FileHelper.getUrl(req, "orders/" + orderResult.getOrderId() + "/buycancel"),
                },
                "transactions": [{
                    "item_list": {
                        "items": [{
                            "name": product.getProductName(),
                            "sku": product.getSku(),
                            "price": price.toString(),
                            "currency": product.getCurrency(),
                            "quantity": quantity
                        }]
                    },
                    "amount": {
                        "currency": product.getCurrency(),
                        "total": (price * quantity).toString()
                    },
                    "description": showMessage('LABEL_BUY_PRODUCT', [product.getProductName(), product.getCurrency() + (price * quantity).toString()])
                }]
            };
            req.app.locals.paypal.payment.create(create_payment_json, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for(let i = 0; i < payment.links.length; i++ ) {
                        if (payment.links[i].rel === 'approval_url') {
                            res.redirect(payment.links[i].href)
                        }
                    }
                }
            });
        } else {
            // fail create order
            res.render('share_customer/error/error', {
                "title" : showMessage('TITLE_CUSTOMER_BUY_PRODUCT'),
                "menu_active" : 'not-found',
                "fullname" : req.session.customer.fullname,
                "error" : {
                    title : "Error",
                    message : showMessage('LABEL_BUY_PRODUCT_FAIL'),
                    callback_url : {
                        href : '/',
                        desc : showMessage('LABEL_DESC_BACK_DASHBOARD')
                    }
                }
            })
        }
    } else {
        res.render('share_customer/error/error', {
            "title" : showMessage('TITLE_CUSTOMER_BUY_PRODUCT'),
            "menu_active" : 'not-found',
            "fullname" : req.session.customer.fullname,
            "error" : {
                title : showMessage('TITLE_CUSTOMER_BUY_PRODUCT'),
                message : showMessage('ERROR_PRODUCT_NOTFOUND'),
                callback_url : {
                    href : '/',
                    desc : showMessage('LABEL_DESC_BACK_DASHBOARD')
                }
            }
        })
    }
})
.get(/^\/(my-product)/, (req, res, next) => {
    if (!req.session.customer) return res.redirect('/login');
    res.render('customer/product/index', {
        "title" : showMessage('TITLE_CUSTOMER_PRODUCT'),
        "menu_active" : 'my-product',
        "fullname" : req.session.customer.fullname
    })
})
module.exports = router;
