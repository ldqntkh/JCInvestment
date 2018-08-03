var paypal = require('paypal-rest-sdk');
// config paypal
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASLnhIT9I40_D0Qi1XcnV0vPqdmzytHF2lO5Gd3TIQTfbdweddTJ6NVmhIvQUM6ZXo7C1vcDfg00idZP',
    'client_secret': 'EMlUXVwhKm6rwtlc6-3JdLdqxoWJAFVKqgFK_KIJxj7XlW_dUi6SR19LlYXVQVFG6pH40Pd_OkeIhuLs'
});

module.exports = {

    paymentJson : null,
    executePaymentJson : null,

    /**
     * Create payment json param
     * @param {String} returnUrl
     * @param {String} cancelUrl
     * @param {Array} items
     * @param {String} currency
     * @param {Number} amount
     * @param {String} description
     */
    CreatePaymentJson : (returnUrl = "", cancelUrl = "", itemList = [], currency = "", amount = 0, description = "")=> {
        this.paymentJson = {
            "intent": "sale",
            // support payment paypal
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": returnUrl,
                "cancel_url": cancelUrl,
            },
            "transactions": [{
                "item_list": {
                    "items": itemList
                },
                "amount": {
                    "currency": currency,
                    "total": amount.toString()
                },
                "description": description
            }]
        }
    },

    CreatePayment: (response)=> {
        try {
            paypal.payment.create(this.paymentJson, function (error, payment) {
                if (error) {
                    throw error;
                } else {
                    for(let i = 0; i < payment.links.length; i++ ) {
                        if (payment.links[i].rel === 'approval_url') {
                            response.redirect(payment.links[i].href)
                        }
                    }
                }
            });
        } catch (err) {
            console.log("Paypal error:" + err.message);
        }
    },

    CreateExecutePaymentJson: (payerId, currency, amount)=> {
        this.executePaymentJson = {
            "payer_id": payerId,
            "transactions": [{
                "amount": {
                    "currency": currency,
                    "total": amount.toString()
                }
            }]
        };
    },

    getPaypalExecuteJson: ()=> {
        return this.executePaymentJson;
    },

    getPaypalPayment: ()=> {
        return paypal.payment;
    }
}