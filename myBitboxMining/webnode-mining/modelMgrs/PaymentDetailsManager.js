'use strict';
const PaymentDetailsModel = require('../models/PaymentDetails');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const PaymentDetailsTable = sequelize.define('payment_details', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING
    },
    orderid : Sequelize.INTEGER,
    payment_method : Sequelize.STRING,
    email : Sequelize.STRING,
    firstname : Sequelize.STRING,
    lastname : Sequelize.STRING,
    payerid: Sequelize.STRING,
    countrycode : Sequelize.STRING,
    state : Sequelize.STRING,
    cart : Sequelize.STRING,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

module.exports = {

    /**
     * create payment details
     * @param {Object} PaymentObject
     * @return {Object} PaymenObject
     */
    createPaymentDetails: async(PaymentObject) => {
        try {
            let payment = await PaymentDetailsTable.create(PaymentObject);
            return payment && payment.dataValues !== null ? new PaymentDetailsModel(payment.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    /**
     * get payment detail by custom field
     * @param {Object} fields {orderId : 1}
     * @return {Object} order
     */
    getPaymentDetailByFields: async(fields) => {
        let results = [];
        try {
            let payments = await PaymentDetailsTable.findAll({
                where: fields
            });
            if (payments.length > 0) {
                for(let i = 0; i < payments.length; i++) {
                    let payment = payments[i].dataValues;
                    let paymentDetailModel =  new PaymentDetailsModel(payment);
                    results.push(paymentDetailModel);
                }
            }
            return results;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}