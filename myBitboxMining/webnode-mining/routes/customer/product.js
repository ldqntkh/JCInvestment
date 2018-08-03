var express = require('express');
var router = express.Router();
// require module
const moment = require('moment');

// import class manager
const ProductManager = require('../../modelMgrs/ProductManager');
const OrderManager = require('../../modelMgrs/OrderManager');
const CustomerHistoryManager = require('../../modelMgrs/CustomerHistoryManager');
const PriceBookManager = require('../../modelMgrs/PriceBookManager');

// import model
const OrderModel = require('../../models/Order');
const CustomerHistoryModel = require('../../models/CustomerHistory');

// import const
const varibale = require('../../const/variable');
const FileHelper = require('../../global/FileHelper');
const showMessage = require('../../global/ResourceHelper').showMessage;

// import library
const PaypalManager = require('../../library/PaymentPaypal');

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
    let product = await ProductManager.getProductByField([{
        id: productId
    }]);
    let quantity = 1;
    if (product !== null) {
        let priceBook = await PriceBookManager.getPriceBook({
            localeId: 'en',
            productId: product.getId()
        });
        let price = priceBook.getSalePrice() !== null ? priceBook.getSalePrice() : priceBook.getPrice();
        // create order
        //console.log("Create Order");
        let order = new OrderModel({
            customerid : customer.id,
            productname: priceBook.getProductName(),
            hashrate : product.getHashrate(),
            quantity: 1,
            description : showMessage('LABEL_BUY_PRODUCT', [priceBook.getProductName(), priceBook.getCurrency() + (price * quantity).toString()]),
            state : varibale.ORDER_CREATE,
            amount : price * 1,
            currency : priceBook.getCurrency(),
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

            // create payment paypal
            PaypalManager.CreatePaymentJson(
                returnUrl = FileHelper.getUrl(req, "orders/" + orderResult.getOrderId() + "/buysuccess/" + productId),
                cancelUrl = FileHelper.getUrl(req, "orders/" + orderResult.getOrderId() + "/buycancel"),
                itemList = [{
                    "name": priceBook.getProductName(),
                    "sku": product.getSku(),
                    "price": price.toString(),
                    "currency": priceBook.getCurrency(),
                    "quantity": quantity
                }],
                currency = priceBook.getCurrency(),
                amount = quantity * price,
                description = showMessage('LABEL_BUY_PRODUCT', [priceBook.getProductName(), priceBook.getCurrency() + (price * quantity).toString()])
            )
            PaypalManager.CreatePayment(res);
            
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
