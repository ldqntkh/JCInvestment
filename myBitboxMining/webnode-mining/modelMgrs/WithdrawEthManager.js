'use strict';
const WithdrawEthModel = require('../models/WithdrawEth');
const showMessage = require('../global/ResourceHelper').showMessage;

// require module
const moment = require('moment');
const SequelizeConfig = require('./SequelizeConfig');
const sequelize = SequelizeConfig.init();

const {WithdrawEthTable} = require('./TableDefine');

module.exports = {

    getWithdrawEthByField: async(field)=> {
        try {
            let withdraw = await WithdrawEthTable.findOne({
                where : field
            });
            return withdraw  && withdraw.dataValues !== null ? new WithdrawEthModel(withdraw.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    /**
     * insert request withdraw eth
     * @param {Object} objWithdrawEth
     * @return {Object} withdrawEth
     */
    insertRequestWithdraw: async (objWithdraw) =>{
        try {
            let results = await WithdrawEthTable.create(objWithdraw);
            return results && results.dataValues !== null ? new WithdrawEthModel(results.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    updateWithdrawEth: async (objWithdraw) => {
        try {
            let results = await WithdrawEthTable.update(objWithdraw, {
                where: {
                    id: objWithdraw.getWithDrawId()
                }
            });
            return results;
        } catch (err) {
            console.log(err.message);
            return -1;
        }
    }
}