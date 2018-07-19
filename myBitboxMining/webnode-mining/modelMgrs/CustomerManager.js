'use strict';
const CustomerModel = require('../models/Customer');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

//const globalAttributes = ['id', 'email', 'fullname', 'phone', 'birthday'];

const CustomerTable = sequelize.define('customer', {
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    fullname:  Sequelize.STRING,
    active: Sequelize.INTEGER,
    phone: Sequelize.STRING,
    birthday: Sequelize.DATE,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});

// class helper
const FileHelper = require('../global/FileHelper');

// import const
const showMessage = require('../global/ResourceHelper').showMessage;

// require module
const moment = require('moment');

module.exports = {
    /**
     * get customer by field name/value
     * @param {Object} field example: {fieldName: valueOfField}
     * @return {Object} customer
     */
    getCustomerByField: async (field) => {
        try {
            var customer = await CustomerTable.findOne({
                where: field
            });
            return customer  && customer.dataValues !== null ? new CustomerModel(customer.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETCUSTOMER') + err.message);
            return null;
        }
    },

    /**
     * @return {List} customers
     */
    getListCustomer: async() => {
        let results = [];
        try {
            var customers = await CustomerTable.findAll({
                where: {
                    active: 1
                }
            });

            if (customers.length > 0) {
                for(let i = 0; i < customers.length; i++) {
                    let customer = new CustomerModel(customers[i].dataValues);
                    results.push(customer);
                }
            }
        } catch(err) {
            console.log(showMessage('ERROR_GETCUSTOMER') + err.message);
        }
        return results;
    },

    /**
     * add new customer
     * @param {Object} customer 
     * @return {Object} customerModel
     */
    addCustomer: async (customerObj) => {
        try {
            customerObj.setPassword(FileHelper.crypto(customerObj.getPassword()));
            customerObj.setCreateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            var customer = await CustomerTable.create(customerObj);
            return customer && customer.dataValues !== null ? new CustomerModel(customer.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_ADDCUSTOMER') + err.message);
            return null;
        }
    },
    /**
     * update customer
     * @param {Object} customer
     * @return {Number} affectedRows
     */
    updateCustomer: async (customer) => {
        try {
            customer.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            var affectedRows =  await CustomerTable.update(customer, {
                                    where: {id: customer.getId()}
                                });
            return affectedRows.length > 0 ? affectedRows[0] : -1;
        } catch(err) {
            console.log(err.message);
            return -1;
        }
    }
}
