'use strict';
var customerObj = require('../models/Customer');

class CustomerManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get object user by email and password
     * @param {String} email
     * @param {String} password 
     * @return {Object} customer
     */
    async getCustomerByEmailAndPassword(email, password) {
        try {
            var result = await this.dbConnect.Doquery("select * from customer where email = :email and password = :password", {"email" : email, "password": password});
            return result !== null && result.length > 0 ? new customerObj(result[0]) : null;
        } catch(err) {
            //console.log(err);
            return null;
        }
    }
}

module.exports = CustomerManager;