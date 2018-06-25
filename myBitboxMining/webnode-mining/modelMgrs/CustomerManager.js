'use strict';
var customerObj = require('../models/Customer');

// require module
var moment = require('moment');

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

    /**
     * Update data customer
     * @param {Object} customer 
     * @return {Number} affectedRows
     */
    async updateCustomer(customer) {
        try {
            customer.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));

            var result = await this.dbConnect.ExcuteUpdate( `update customer set email = :email, fullname = :fullname, phone = :phone
                                                            , birthday = :birthday, updateAt = :updateAt where id = :id`, customer);
            return result.affectedRows;
        } catch (err) {
            return -1;
        }
    }
}

module.exports = CustomerManager;