'use strict';
const OrderModel = require('../models/Order');

const OrderTable = require('./TableDefine').OrderTable;

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

    /**
     * get order by order id
     * @param {Number} orderid
     * @return {Object} order
     */
    getOrderById: async(orderId) => {
        try {
            let order = await OrderTable.findById(orderId);
            return order && order.dataValues !== null ? new OrderModel(order.dataValues) : null
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    /**
     * get order by custom fiel
     * @param {Object} fiels {orderId : 1}
     * @return {Object} order
     */
    getOrderByFields: async(fiels) => {
        try {
            let results = [];
            let orders = await OrderTable.findAll({
                where: fiels
            });
            if (orders.length > 0) {
                for(let i = 0; i < orders.length; i++) {
                    let order = orders[i].dataValues;
                    let orderModel =  new OrderModel(order);
                    results.push(orderModel);
                }
            }
            return results;
        } catch (err) {
            console.log(err.message);
            return -1;
        }
    },

    /**
     * Update order
     * @param {Object} order
     * @return {Number} affectedRows
     */
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
    },

    /**
     * Delete order
     * @param {Object} order
     * @return {Number} affectedRows
     */
    deleteOrder: async (field) => {
        try {
            let results = await OrderTable.destroy({
                where : field
            });
            return results;
        } catch (err) {
            console.log(err.message);
            return '';
        }
    }
}