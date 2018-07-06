'use strict';
const WalletModel = require('../models/Wallet');
const SequelizeConfig = require('./SequelizeConfig');

// import const
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

module.exports = {
    /**
     * get list wallet of customer
     * @param {Object} field {customerid : 1}
     * @return {Object} List wallet
     */
    getListWallet: async (field) => {
        try {
            let results = [];
            let listWallet = await WalletTable.findAll({
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
    },

    /**
     * Get wallet by wallet address
     * @param {Object} field {'walletAddress' : 'value'}
     * @return {Object} Wallet
     */
    getWalletByAddress: async (field)=> {
        try {
            let wallet = await WalletTable.findOne({
                where : field
            });
            return wallet  && wallet.dataValues !== null ? new WalletModel(wallet.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    /**
     * add new wallet
     * @param {Object} wallet
     * @return {Object} wallet
     */
    addNewWallet: async (walletObject) => {
        try {
            let results = await WalletTable.create(walletObject);
            return results && results.dataValues !== null ? new WalletModel(results.dataValues) : null;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    },

    /**
     * delete wallet by field
     * @param {Object} field 
     * @return {Number} results
     */ 
    deleteWallet: async (field) => {
        try {
            let results = await WalletTable.destroy({
                where : field
            });
            return results;
        } catch (err) {
            console.log(err.message);
            return -1;
        }
    },

    /**
     * update wallet Object
     * @param {Object} walletObject 
     * @return {Number} results
     */ 
    updateWallet: async (walletObject) => {
        try {
            let results = await WalletTable.update(walletObject, {
                where: {
                    id: walletObject.getWalletId()
                }
            });
            return results;
        } catch (err) {
            console.log(err.message);
            return -1;
        }
    },

    getListWalletWithCalculation: async (field) => {
        try {
            let results = [];
            let ProductOfCustomer = await sequelize.define('productofcustomer', {
                hashrate: Sequelize.FLOAT,
                walletId: Sequelize.INTEGER
            });
            let WalletBalance = await sequelize.define('walletbalance', {
                balance: Sequelize.FLOAT,
                walletId: Sequelize.INTEGER
            });
            
            await WalletTable.belongsTo(ProductOfCustomer, {foreignKey: 'id', targetKey: 'walletId'});
            await WalletTable.belongsTo(WalletBalance, {foreignKey: 'id', targetKey: 'walletId'});
            
            let listWallet = await WalletTable.findAll({
                where: field,
                attributes: {include: [[sequelize.fn('SUM', sequelize.col('productofcustomer.hashrate')), 'hashrate'],
                                      [sequelize.col('walletbalance.balance'), 'balance']]
                },
                include: [{model: ProductOfCustomer}, {model: WalletBalance}],
                group: ['wallet.id']
            });
            if (listWallet.length > 0) {
                for(let i = 0; i < listWallet.length; i++) {
                    let walletItem = listWallet[i].dataValues;
                    let walletModel = new WalletModel(walletItem);
                    walletModel.hashrate = walletItem.hashrate;
                    walletModel.balance = walletItem.balance;
                    results.push(walletModel);
                }
            }
            console.log(results);
            return results;
        } catch(err) {
            console.log(err.message);
            return null;
        }
    }
}
