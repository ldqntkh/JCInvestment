'use strict';
const CustomerHistoryModel = require('../models/CustomerHistory');

const CustomerHistoryTable = require('./TableDefine').CustomerHistoryTable;

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
                where: field,
                order: [
                    ['id', 'DESC']
                ]
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