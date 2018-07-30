'use strict';

class Pricebook {
    constructor (PricebookObject) {
        PricebookObject && Object.assign(this, PricebookObject);
        /**
         * id : Number
         * localeId: String
         * productId: Number
         * name : String
         * price : float
         * sale_price : float
         * currency : String
         * symbol_currency: String
         * desc1 : String
         * desc2 : String
         * desc3 : String
         * enable : bool
         */
    }

    /**
     * get product id
     * @returns {Number} product id
     */
    getId() {
        return this.id;
    }

    /**
     * get locale id
     * @returns {String} locale id
     */
    getLocaleId() {
        return this.localeId;
    }

    /**
     * get product id
     * @returns {String} productId
     */
    getProductId() {
        return this.productId;
    }

    /**
     * get localeId
     * @returns {String} localeId
     */
    getLocaleId() {
        return this.localeId;
    }

    /**
     * get product name
     * @returns {String} product nanme
     */
    getProductName() {
        return this.name;
    }

    /**
     * get currency
     * @return {String} currency
     */
    getCurrency() {
        return this.currency;
    }

    /**
     * get symbol_currency
     * @return {String} symbol_currency
     */
    getSymbolCurrency() {
        return this.symbol_currency;
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
     * get first description of product
     * @returns {String} first description of product
     */
    getFirstDesc() {
        return this.desc1;
    }

    /**
     * get second description of product
     * @returns {String} second description of product
     */
    getSecondDesc() {
        return this.desc2;
    }

    /**
     * get third description of product
     * @returns {String} third description of product
     */
    getThirdDesc() {
        return this.desc3;
    }

    /**
     * get hashrate of product
     * @returns {Number} hashrate
     */
    getHashrate() {
        return this.hashrate;
    }

    /**
     * get maintenance fee
     * @returns {Number} maintenance free
     */
    getMaintenanceFee() {
        return this.maintenance_fee;
    }
}
module.exports = Pricebook;