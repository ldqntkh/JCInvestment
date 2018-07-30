'use strict';
const ProductModel = require('../models/ProductOfCustomer');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const moment = require('moment');

const ProductTable = sequelize.define('productofcustomer', {
    name: Sequelize.STRING,
    hashrate: Sequelize.FLOAT,
    customerId: Sequelize.INTEGER,
    walletId : Sequelize.INTEGER,
    active : Sequelize.BOOLEAN,
    expired : Sequelize.BOOLEAN,
    period : Sequelize.INTEGER,
    maintenance_fee: Sequelize.FLOAT,
    userUpdate : Sequelize.INTEGER,
    startDate : Sequelize.DATE,
    endDate : Sequelize.DATE,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

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
    },

    /**
     * get list products of customer
     * @param {Object} {'customerId' : 1}
     * @return {Object} array list product
     */
    getListProductOfCustomer : async(field) => {
        let results = [];
        try {
            let products = await ProductTable.findAll({
                where: field
            });
            if (products.length > 0) {
                for(let i = 0; i < products.length; i++) {
                    let productModel = new ProductModel(products[i].dataValues);
                    productModel.startDate !== null && (productModel.startDate = moment(new Date(productModel.startDate)).format('DD/MM/YYYY'));
                    productModel.endDate !== null && (productModel.endDate = moment(new Date(productModel.endDate)).format('DD/MM/YYYY'));
                    results.push(productModel);
                }
            }
        } catch (err) {
            console.log(err);
        }
        return results;
    },
    /**
     * get list total hashrate
     * @param {Object} whereOptions {'customerId' : 1}
     * @return {Array} array list total hashrate
     */
    getListTotalHashRate: async (whereOptions) => {
        let results = [];
        try {
            let listProductOfCustomer = await ProductTable.findAll({
                where: whereOptions,
                attributes: {
                    include: [[sequelize.fn('sum', sequelize.col('hashrate')), 'totalHashrate'], 'customerId'],
                    exclude: ['id', 'name', 'hashrate', 'walletId', 'startDate', 'endDate', 'createAt', 'updateAt']
                },
                group: ['customerId']
            });
            if (listProductOfCustomer.length > 0) {
                for(let i = 0; i < listProductOfCustomer.length; i++) {
                    let productOfCustomerItem = listProductOfCustomer[i].dataValues;
                    results.push(productOfCustomerItem);
                }
            }
        } catch(err) {
            console.log(err.message)
        }
        return results;
    },
    /**
     * update product
     * @param {Object} whereOptions {'customerId' : 1}
     * @return {Array} array list total hashrate
     */
    updateProduct: async(product, whereOption) => {
        let affectedRows = 0;
        try {
            affectedRows =  await ProductTable.update(product, {
                where: whereOption
            });
        } catch(err) {
            console.log(err.message);
        }
        return affectedRows;
    },
    /**
     * delete product
     * @param {Object} whereOption {'customerId' : 1}
     * @return {Number} affectedRows
     */
    deleteProduct: async(whereOption) => {
        let affectedRows = -1;
        try {
            affectedRows = await ProductTable.destroy({
                where : whereOption
            });
        } catch (err) {
            console.log(err.message);
        }
        return affectedRows;
    }
}