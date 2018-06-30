'use strict';

class Product {
    constructor (ProductObject) {
        ProductObject && Object.assign(this, ProductObject);
        /**
         * id : Number
         * name : String
         * sku : String
         * hashrate : float
         * price : float
         * sale_price : float
         * currency : String
         * symbol_currency: String
         * desc1 : String
         * desc2 : String
         * desc3 : String
         * period : Number
         * enable : bool
         * userUpdate : Number
         * createAt : datetime
         * updateAt : datetime
         */
    }
    /**
     * get product name
     * @returns {String} product nanme
     */
    getProductName() {
        return this.name;
    }

    /**
     * get product sku
     * @returns {String} product sku
     */
    getSku() {
        return this.sku;
    }

    /**
     * get currency
     * @return {String} currency
     */
    getCurrency() {
        return this.currency;
    }

    /**
     * get product price
     * @returns {Number} product price
     */
    getPrice() {
        return this.price;
    }

    /**
     * get product sale price
     * @returns {Number} product sale price
     */
    getSalePrice() {
        return this.sale_price;
    }

    /**
     * get period
     * @returns {Number} period
     */
    getPeriod() {
        return this.period;
    }
}
module.exports = Product;