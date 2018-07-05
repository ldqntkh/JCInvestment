'use strict';

class PaymentDetails {
    constructor (PaymentDetailsObject) {
        PaymentDetailsObject && Object.assign(this, PaymentDetailsObject);
        /**
         * id : String
         * orderid:  Number
         * payment_method : String
         * email : string
         * firstname : string
         * lastname : string
         * payerid: String
         * countrycode : string
         * state : string
         * cart : string
         * createAt : date
         * updateAt : date
         */
    }

    /**
     * get payment id
     * @return {String} paymentid
     */
    getPaymentId() {
        return this.id;
    }

    /**
     * get payment details state
     * @return {String} state
     */
    getState() {
        return this.state;
    }
}
module.exports = PaymentDetails;