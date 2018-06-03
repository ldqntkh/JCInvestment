'use strict';

var walletTypeObject = require('../models/WalletType');
const logFile = require('../globalFunctions');
class WalletTypeManager {

    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get all wallet type
     * @return {List}
     */
    async getAllWalletType() {
        try {
            var result = await this.dbConnect.Doquery('select * from wallettype', {});
            if (result !== null && result.length > 0) {
                return result;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getAllWalletType', __filename, 23, err);
            return null;
        }
    }

    async getWalletTypeById(walletTypeId) {
        try {
            var result = await this.dbConnect.Doquery('select * from wallettype where walletTypeId = :walletTypeId',
                                                {"walletTypeId" : walletTypeId});
            if (result !== null && result.length > 0) {
                var walletType = new walletTypeObject(result[0]);
                return walletType;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWalletTypeById', __filename, 38, err);
            return -1;
        }
    }

    /**
     * add new a wallet type
     * @param {Object} walletType 
     * @return {Number}
     */
    async addNewWalletType(walletType) {
        try {
            var result = await this.dbConnect.ExcuteInsert(`insert into walletType (name, symbol, urlbalance, urltotalcoin, urlearning, lastUpdate)`, walletType);
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('addNewWalletType', __filename, 54, err);
            return -1;
        }
    }

    /**
     * update new data wallet type
     * @param {Object} walletType 
     * @return {Number}
     */
    async updateWalletType(walletType) {
        try {
            var result = await this.dbConnect.ExcuteUpdate(`update tb_walletType set name = :name, symbol = :symbol, urlbalance = :urlbalance,
                                                            urltotalcoin = :urltotalcoin, urlearning = :urlearning, lastUpdate = :lastUpdate 
                                                            where walletTypeId = :walletTypeId`,
                                                            walletType);
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('updateWalletType', __filename, 73, err);
            return -1;
        }
    }
}

module.exports = WalletTypeManager;