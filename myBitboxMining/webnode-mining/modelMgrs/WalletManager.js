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

const WalletBalance = sequelize.define('walletbalance', {
    balance: Sequelize.FLOAT,
    walletId: Sequelize.INTEGER
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
    /**
     * get list wallet by condition options
     * @param {Array} options example: we have 3 where options for 3 table wallet, productOfCustomer and walletBalance
     * @return {Array} results
     */
    getListWalletWithCalculation: async (options) => {
        try {
            let results = [];
            let whereOptions = options ? options : [];
            let ProductOfCustomer = await sequelize.define('productofcustomer', {
                hashrate: Sequelize.FLOAT,
                walletId: Sequelize.INTEGER
            });

            await WalletTable.belongsTo(ProductOfCustomer, {foreignKey: 'id', targetKey: 'walletId'});
            await WalletTable.belongsTo(WalletBalance, {foreignKey: 'id', targetKey: 'walletId'});
            
            let listWallet = await WalletTable.findAll({
                where: whereOptions[0],
                attributes: {include: [[sequelize.fn('SUM', sequelize.col('productofcustomer.hashrate')), 'hashrate'],
                                      [sequelize.col('walletbalance.balance'), 'balance']]
                },
                include: [{
                    model: ProductOfCustomer,
                    where: whereOptions[1],
                    required: false
                },
                {
                    model: WalletBalance,
                    where: whereOptions[2],
                    required: false
                }],
                group: ['wallet.id']
            });
            if (listWallet.length > 0) {
                for(let i = 0; i < listWallet.length; i++) {
                    let walletItem = listWallet[i].dataValues;
                    let walletModel = new WalletModel(walletItem);
                    results.push(walletModel);
                }
            }
            return results;
        } catch(err) {
            console.log(err.message);
            return [];
        }
    },
    /**
     * get list wallet by condition options
     * @param {Object} whereOption
     * @return {Array} results example: [{customerId: 1, totalBalance: 0}]
     */
    getTotalBalanceByCustomerId: async (whereOption) => {
        try {
            let results = [];
            await WalletTable.belongsTo(WalletBalance, {foreignKey: 'id', targetKey: 'walletId'});
            let listWallet = await WalletTable.findAll({
                where: whereOption,
                attributes: {
                    include: [[sequelize.fn('SUM', sequelize.col('walletbalance.balance')), 'totalBalance']],
                    exclude: ['id', 'walletAddress', 'walletName', 'walletTypeId', 'createAt', 'updateAt']
                },
                include: {
                    model: WalletBalance
                },
                group: ['wallet.customerId']
            });
            if (listWallet.length > 0) {
                for(let i = 0; i < listWallet.length; i++) {
                    let walletItem = listWallet[i].dataValues;
                    let walletModel =  new WalletModel(walletItem);
                    results.push(walletModel);
                }
            }
            return results;
        } catch(err) {
            console.log(err.message);
            return [];
        }
    }
}
