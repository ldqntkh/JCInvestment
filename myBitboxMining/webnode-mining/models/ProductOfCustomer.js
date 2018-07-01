'use strict';

class ProductOfCustomer {
    constructor (ProductOfCustomerObject) {
        ProductOfCustomerObject && Object.assign(this, ProductOfCustomerObject);
        /**
         * id : Number
         * name : String
         * hashrate : number
         * customerId : Number
         * walletId : Number
         * active : bool
         * expired : bool
         * period : Number
         * userUpdate : Number
         * startDate : date
         * endDate : date
         * createAt : date
         * updateAt : date
         */
    }

    /**
     * get product id of customer
     * @returns {Number} id
     */
    getProductId() {
        return this.id;
    }
}

module.exports = ProductOfCustomer;