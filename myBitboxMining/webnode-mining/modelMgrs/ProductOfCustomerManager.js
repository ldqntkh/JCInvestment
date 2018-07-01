'use strict';
const ProductModel = require('../models/ProductOfCustomer');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const ProductTable = sequelize.define('productofcustomer', {
    name: Sequelize.STRING,
    hashrate: Sequelize.FLOAT,
    customerId: Sequelize.INTEGER,
    walletId : Sequelize.INTEGER,
    active : Sequelize.BOOLEAN,
    expired : Sequelize.BOOLEAN,
    period : Sequelize.INTEGER,
    userUpdate : Sequelize.INTEGER,
    startDate : Sequelize.DATE,
    endDate : Sequelize.DATE,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

// class helper
const FileHelper = require('../private/js/FileHelper');

module.exports = {

    /**
     * Create new product
     * @param {Object} productofcustomer
     * @returns {Object} productofcustomer
     */
    createProduct: async(productofcustomer)=> {
        try {
            let result = await ProductTable.create(productofcustomer);
            return result && result.dataValues !== null ? new ProductModel(result.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}