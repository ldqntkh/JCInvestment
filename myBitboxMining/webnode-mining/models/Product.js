'use strict';

class Product {
    constructor (ProductObject) {
        ProductObject && Object.assign(this, ProductObject);
        /**
         * id : Number
         * sku : String
         * hashrate : float
         * userUpdate : Number
         * createAt : datetime
         * updateAt : datetime
         */
    }

    /**
     * get product sku
     * @returns {String} product sku
     */
    getSku() {
        return this.sku;
    }

    /**
     * get period
     * @returns {Number} period
     */
    getPeriod() {
        return this.period;
    }

     /**
     * get userUpdate
     * @returns {Number} userUpdate
     */
    getUserUpdate() {
        return this.userUpdate;
    }

    /**
     * get hashrate of product
     * @returns {Number} hashrate
     */
    getHashrate() {
        return this.hashrate;
    }
}
module.exports = Product;