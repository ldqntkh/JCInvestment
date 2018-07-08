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
    },

    getListHistories: async(field) => {
        let results = [];
        try {
            let histories = await CustomerHistoryTable.findAll({
                where: field
            });
            if (histories.length > 0) {
                for(let i = 0; i < histories.length; i++) {
                    let history = histories[i].dataValues;
                    let historyModel =  new CustomerHistoryModel(history);
                    results.push(historyModel);
                }
            }
        } catch (err) {
            console.log(err.message);
        }
        return results;
    }
}