'use strict';

class Product {
    constructor (ProductObject) {
        ProductObject && Object.assign(this, ProductObject);
        /**
         * id : Number
         * name : String
         * hashrate : float
         * price : float
         * sale_price : float
         * currency : String
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
}
module.exports = Product;