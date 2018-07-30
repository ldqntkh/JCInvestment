'use strict';
const MaintenanceFee = require('../models/MaintenanceFee');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

//const globalAttributes = ['id', 'email', 'fullname', 'phone', 'birthday'];

const MaintenanceFeeTable = sequelize.define('maintenance_fee', {
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
    getTotalMaintainFeeByField: async (field) => {
        try {
            let maintenance_fee = await MaintenanceFeeTable.findOne({
                where: field
            });
            return maintenance_fee  && maintenance_fee.dataValues !== null ? new MaintenanceFee(maintenance_fee.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETCUSTOMER') + err.message);
            return null;
        }
    },
    getAllMaintainFee: async () => {
        try {
            let results = [];
            let maintenance_fees = await MaintenanceFeeTable.findAll();
            if (maintenance_fees.length > 0) {
                for(let i = 0; i < maintenance_fees.length; i++) {
                    let maintenance_fee = maintenance_fees[i].dataValues;
                    let maintenanceFee =  new MaintenanceFee(maintenance_fee);
                    results.push(maintenanceFee);
                }
            }
            return results;
        } catch(err) {
            console.log(showMessage('ERROR_GETCUSTOMER') + err.message);
            return null;
        }
    }
}
