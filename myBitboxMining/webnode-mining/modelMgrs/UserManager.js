'use strict';
const UserModel = require('../models/User');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

// import const
const language = require('../const/variableLabel');

//const globalAttributes = ['id', 'email', 'fullname', 'phone', 'birthday'];

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

// ignore column id
UserTable.removeAttribute('id');

// class helper
const FileHelper = require('../private/js/FileHelper');

// require module
const moment = require('moment');

module.exports = {
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
            return user  && user.dataValues !== null ? new UserModel(user.dataValues) : null;
        } catch(err) {
            console.log(language.en.ERROR_GETUSER + err.message);
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
            console.log(language.en.ERROR_ADDUSER + err.message);
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
