'use strict';
const UserModel = require('../models/User');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const UserTable = sequelize.define('user', {
    email: Sequelize.STRING,
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    fullname:  Sequelize.STRING,
    userTypeId: Sequelize.INTEGER,
    phone: Sequelize.STRING,
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
     * get user by field name/value
     * @param {Object} field example: {fieldName: valueOfField}
     * @return {Object} user
     */
    getAllUser: async (options) => {
        try {
            var users = null;
            if (typeof options !== 'undefined' && options.length > 0) {
                users = await UserTable.findAll({attributes: options});
            } else {
                users = await UserTable.findAll();
            }
            return users ? users : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETUSER') + err.message);
            return null;
        }
    },
    /**
     * get user by field name/value
     * @param {Object} field example: {fieldName: valueOfField}
     * @return {Object} user
     */
    getUserByField: async (field) => {
        try {
            var user = await UserTable.findOne({
                where: field
            });
            return user && user.dataValues !== null ? new UserModel(user.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETUSER') + err.message);
            return null;
        }
    },
    /**
     * add new user
     * @param {Object} userObj 
     * @return {Object} userModel
     */
    addUser: async (userObj) => {
        try {
            userObj.setPassword(FileHelper.crypto(userObj.getPassword()));
            userObj.setCreateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            var user = await UserTable.create(userObj);
            return user && user.dataValues !== null ? new UserModel(user.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_ADDUSER') + err.message);
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
            var affectedRows =  await UserTable.update(customer, {
                                    where: {id: customer.getId()}
                                });
            return affectedRows.length > 0 ? affectedRows[0] : -1;
        } catch(err) {
            console.log(err.message);
            return -1;
        }
    }
}
