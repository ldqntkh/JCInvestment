var express = require('express');
var router = express.Router();

const ProductManager = require('../../modelMgrs/ProductManager');

router.post('/products/:productid/buy', async (req, res, next)=> {
    /**
     * create order
     * create order detail
     * create history
     * create payment
     */

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
        const create_payment_json = {
            "intent": "sale",
            // support payment paypal
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:3030/products/" + productId + "/buysuccess",
                "cancel_url": "http://localhost:3030/products/" + productId + "/buycancel",
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
                "description": "Buy " + product.getProductName() + " with price " + product.getCurrency() + (price * quantity).toString()
            }]
        };
        console.log(create_payment_json);
        req.app.locals.paypal.payment.create(create_payment_json, function (error, payment) {
            if (error) {
                throw error;
            } else {
                // create order
                console.log("Create Payment Response");
                console.log(payment);
                for(let i = 0; i < payment.links.length; i++ ) {
                    if (payment.links[i].rel === 'approval_url') {
                        res.redirect(payment.links[i].href)
                    }
                }
            }
        });
    } else {
        res.send('Can not buy product');
    }
})
module.exports = router;
