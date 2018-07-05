'use strict';

class CustomerHistory {
    constructor(CustomerHistoryObject) {
        CustomerHistoryObject && Object.assign(this, CustomerHistoryObject);
        /**
         * id : Number
         * customerId: Number
         * userId : Number
         * description : String
         * createAt : Date
         * updateAt : Date
         */
    }
}

module.exports = CustomerHistory;