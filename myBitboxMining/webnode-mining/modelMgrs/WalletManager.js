'use strict';
const WalletModel = require('../models/Wallet');
const SequelizeConfig = require('./SequelizeConfig');

// import const
const language = require('../const/variableLabel');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const WalletTable = sequelize.define('wallet', {
    walletAddress: Sequelize.STRING,
    walletName: Sequelize.STRING,
    walletTypeId : Sequelize.INTEGER,
    customerId : Sequelize.INTEGER,
    createAt: Sequelize.DATE,
    updateAt: Sequelize.DATE
});

// class helper
const FileHelper = require('../private/js/FileHelper');

// require module
const moment = require('moment');

module.exports = {
    /**
     * get list wallet of customer
     * @param {Object} {customerid : 1}
     * @return {Object} List wallet
     */
    getListWallet: async (field) => {
        try {
            let results = [];
            let listWallet = await WalletTable.getAll({
                where : field
            });
            if (listWallet.length > 0) {
                for(let i = 0; i < listWallet.length; i++) {
                    let walletModel = new WalletModel(listWallet[i].dataValues);
                    results.push(walletModel);
                }
            }
            return results;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}