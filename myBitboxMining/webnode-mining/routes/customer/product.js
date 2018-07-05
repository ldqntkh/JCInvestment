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
const language = require('../../const/variableLabel');

var FileHelper = require('../../private/js/FileHelper');
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
            description : language.en.LABEL_BUY_PRODUCT.replace('{0}', product.getProductName()). replace('{1}', product.getCurrency() + (price * quantity).toString()),
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
                description : language.en.LABEL_CREATE_ORDER.replace('{0}', "<a class='history' href='/orders/" + orderResult.getOrderId() + "'>" + orderResult.getOrderId() + "</a>"),
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
                    "description": language.en.LABEL_BUY_PRODUCT.replace('{0}', product.getProductName()). replace('{1}', product.getCurrency() + (price * quantity).toString())
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
                "title" : language.en.TITLE_CUSTOMER_BUY_PRODUCT,
                "menu_active" : 'not-found',
                "fullname" : req.session.customer.fullname,
                "error" : {
                    title : "Error",
                    message : language.en.LABEL_BUY_PRODUCT_FAIL,
                    callback_url : {
                        href : '/',
                        desc : language.en.LABEL_DESC_BACK_DASHBOARD
                    }
                }
            })
        }
    } else {
        res.render('share_customer/error/error', {
            "title" : language.en.TITLE_CUSTOMER_BUY_PRODUCT,
            "menu_active" : 'not-found',
            "fullname" : req.session.customer.fullname,
            "error" : {
                title : language.en.TITLE_CUSTOMER_BUY_PRODUCT,
                message : language.en.ERROR_PRODUCT_NOTFOUND,
                callback_url : {
                    href : '/',
                    desc : language.en.LABEL_DESC_BACK_DASHBOARD
                }
            }
        })
    }
})
.get('/product/create', async (req, res) => {
    try {
        if (!req.session.user) return res.redirect('/login');

        let existedUser = await UserManager.getUser({email: req.session.user.email});
        if (existedUser && existedUser.getUserTypeId === 1) {
            let product = {
                
            }
            await ProductManager.addProduct(product);
        }
    } catch(err) {
        console.log('')
    }
    res.render()
})
module.exports = router;
