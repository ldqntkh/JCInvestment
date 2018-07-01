'use strict';
const OrderModel = require('../models/Order');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const OrderTable = sequelize.define('orders', {
    customerid : Sequelize.INTEGER,
    productname : Sequelize.STRING,
    hashrate : Sequelize.FLOAT,
    quantity : Sequelize.INTEGER,
    description : Sequelize.STRING,
    state : Sequelize.STRING,
    amount: Sequelize.FLOAT,
    currency : Sequelize.STRING,
    product_period : Sequelize.INTEGER,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

// class helper
const FileHelper = require('../private/js/FileHelper');

module.exports = {

    /**
     * create new order
     * @param {Object} orderObject
     * @returns {Object}
     */
    createOrder: async(orderObject) => {
        try {
            let order = await OrderTable.create(orderObject);
            return order && order.dataValues !== null ? new OrderModel(order.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    getOrderById: async(orderId) => {
        try {
            let order = await OrderTable.findById(orderId);
            return order && order.dataValues !== null ? new OrderModel(order.dataValues) : null
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    updateOrder: async(order) => {
        try {
            var affectedRows =  await OrderTable.update(order, {
                                    where: {id: order.getOrderId()}
                                });
            return affectedRows.length > 0 ? affectedRows[0] : -1;
        } catch(err) {
            console.log(err.message);
            return -1;
        }
    }
}