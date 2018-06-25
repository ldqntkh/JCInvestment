'use strict';
var customerObj = require('../models/Customer');
var EmailHelper = require('../private/js/EmailHelper');

// require module
var moment = require('moment');
var crypto = require('crypto');

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

    /**
     * get customer by email
     * @param {String} email
     * @return {Object} customer
     */
    async getCustomerByEmail(email) {
        try {
            var result = await this.dbConnect.Doquery("select * from customer where email = :email", {"email" : email});
            return result !== null && result.length > 0 ? new customerObj(result[0]) : null;
        } catch(err) {
            return null;
        }
    }

    /**
     * add new customer
     * @param {Object} customer 
     * @return {Number} affectedRows
     */
    async addCustomer(customer) {
        try {
            var passwordHashed = crypto.createHmac('sha256', customer.getPassword())
                .digest('hex');
            customer.setPassword(passwordHashed);
            customer.setCreateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            var result = null;
            result = await this.dbConnect.ExcuteInsert("insert into customer(email, password, fullname, birthday, phone, active, createAt) " +
                                                            "values(:email, :password, :fullname, :birthday, :phone, :active, :createAt)", customer);
            return (result !== null) ? {affectedRows: result.affectedRows, id: result.insertId} : -1;
        } catch(err) {
            console.log(err.message);
            return -1;
        }
    }
}

module.exports = CustomerManager;