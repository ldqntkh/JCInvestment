'use strict';

class Product {
    constructor (ProductObject) {
        ProductObject && Object.assign(this, ProductObject);
        /**
         * id : Number
         * sku : String
         * hashrate : float
         * period: Number
         * userUpdate : Number
         * createAt : datetime
         * updateAt : datetime
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
     * set product id
     * @param {Number} product id
     */
    setId(id) {
        this.id = id;
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

    /**
     * get period
     * @returns {Number} period
     */
    getPeriod() {
        return this.period;
    }

    /**
     * set createAt of product
     * @param {Date} createAt
     */
    setCreateAt(createAt) {
        this.createAt = createAt;
    }

    /**
     * get createAt of product
     * @param {Date} createAt
     */
    getCreateAt() {
        return this.createAt;
    }

    /**
     * set updateAt of product
     * @param {Date} updateAt
     */
    setUpdateAt(updateAt) {
        this.updateAt = updateAt;
    }
}
module.exports = Product;