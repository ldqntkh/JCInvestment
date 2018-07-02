'use strict';
const CustomerHistoryModel = require('../models/CustomerHistory');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const CustomerHistoryTable = sequelize.define('historyofcustomer', {
    customerId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
    description: Sequelize.STRING,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

// class helper
const FileHelper = require('../private/js/FileHelper');

module.exports = {

    /**
     * Create new history
     * @param {Object} history
     * @returns {Object} history
     */
    createHistory: async(history)=> {
        try {
            let result = await CustomerHistoryTable.create(history);
            return result && result.dataValues !== null ? new CustomerHistoryModel(result.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }


}