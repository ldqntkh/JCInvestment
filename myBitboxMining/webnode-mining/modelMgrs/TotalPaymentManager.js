'use strict';
const TotalPaymentModel = require('../models/TotalPayment');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

//const globalAttributes = ['id', 'email', 'fullname', 'phone', 'birthday'];

const TotalPaymentTable = sequelize.define('totalpayment', {
    customerId: Sequelize.INTEGER,
    settlementDate: Sequelize.DATE,
    paymentDate:  Sequelize.DATE,
    paymentMethod: Sequelize.STRING,
    paymentStatus: Sequelize.INTEGER,
    totalPayment: Sequelize.FLOAT,
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
    getTotalPaymentByField: async (field) => {
        try {
            let totalPayment = await TotalPaymentTable.findOne({
                where: field
            });
            return totalPayment  && totalPayment.dataValues !== null ? new TotalPaymentModel(totalPayment.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETCUSTOMER') + err.message);
            return null;
        }
    },
    getAllTotalPayments: async () => {
        try {
            let results = [];
            let totalPayments = await TotalPaymentTable.findAll();
            if (totalPayments.length > 0) {
                for(let i = 0; i < totalPayments.length; i++) {
                    let totalPayment = totalPayments[i].dataValues;
                    let totalPaymentModel =  new TotalPaymentModel(totalPayment);
                    results.push(totalPaymentModel);
                }
            }
            return results;
            return totalPayment  && totalPayment.dataValues !== null ? new TotalPaymentModel(totalPayment.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETCUSTOMER') + err.message);
            return null;
        }
    }
}
