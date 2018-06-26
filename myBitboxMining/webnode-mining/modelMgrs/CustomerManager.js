'use strict';
var customerObj = require('../models/Customer');
const EmailHelper = require('../private/js/EmailHelper');
const FileHelper = require('../private/js/FileHelper');

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
            var passwordHashed = FileHelper.crypto(password);
            var result = await this.dbConnect.Doquery("select * from customer where email = :email and password = :password", {"email" : email, "password": passwordHashed});
            return result !== null && result.length > 0 ? new customerObj(result[0]) : null;
        } catch(err) {
            //console.log(err);
            return null;
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
     * get customer by id
     * @param {Number} id
     * @return {Object} customer
     */
    async getCustomerById(id) {
        try {
            var result = await this.dbConnect.Doquery("select * from customer where id = :id", {"id" : id});
            return result !== null && result.length > 0 ? new customerObj(result[0]) : null;
        } catch(err) {
            return null;
        }
    }

    /**
     * get customer by active
     * @param {Number} active
     * @return {Object} customer
     */
    async getCustomerByActive(active) {
        try {
            var result = await this.dbConnect.Doquery("select email from customer where active = :active", {"active" : active});
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
            var passwordHashed = FileHelper.crypto(customer.getPassword());
            customer.setPassword(passwordHashed);
            customer.setCreateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            var result = await this.dbConnect.ExcuteInsert("insert into customer(email, password, fullname, birthday, phone, active, createAt) " +
                                                            "values(:email, :password, :fullname, :birthday, :phone, :active, :createAt)", customer);
            return (result !== null) ? {affectedRows: result.affectedRows, id: result.insertId} : -1;
        } catch(err) {
            console.log(err.message);
            return -1;
        }
    }

    /**
     * update customer
     * @param {Object} customer 
     * @return {Number} affectedRows
     */
    async updateCustomer(customer) {
        try {
            customer.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            var result = await this.dbConnect.ExcuteUpdate("update customer set phone = :phone, fullname = :fullname, birthday = :birthday," +
                                                            "updateAt = :updateAt where id = :id", customer);
            return (result !== null) ? result.affectedRows : -1;
        } catch(err) {
            console.log(err.message);
            return -1;
        }
    }

    /**
     * Update active field in customer
     * @param {Object} customer
     * @return {Number} affectedRows
     */
    async updateCustomerActive(customer) {
        try {
            console.log(customer);
            customer.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));

            var result = await this.dbConnect.ExcuteUpdate( "update customer set active = :active, updateAt = :updateAt where id = :id", customer);
            return result.affectedRows;
        } catch (err) {
            return -1;
        }
    }
}

module.exports = CustomerManager;