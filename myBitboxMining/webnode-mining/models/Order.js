'use strict';

class Order {
    constructor (OrderObject) {
        OrderObject && Object.assign(this, OrderObject);
        /**
         * id : number
         * customerid: number
         * productname : string
         * quantity : Number
         * description : String
         * state : String
         * amount : Number
         * currency : string
         * product_period : Number
         * createAt : Date
         * updateAt : Date
         */
    }

    /**
     * get order id
     * @return {Number} orderid
     */
    getOrderId() {
        return this.id;
    }

    /**
     * get product period
     * @returns {Number} produuct_period
     */
    getProductPeriod() {
        return this.product_period;
    }

    /**
     * get order currency
     * @return {String} currency
     */
    getCurrency() {
        return this.currency;
    }

    /**
     * get order amount
     * @return {Number} amount
     */
    getAmount() {
        return this.amount;
    }

    /**
     * set order state
     * @param {String} state 
     */
    setState(state) {
        this.state = state;
    }

    /**
     * set date update 
     * @param {Date} date 
     */
    setUpdateAt(date) {
        this.updateAt = date;
    }
}
module.exports = Order;