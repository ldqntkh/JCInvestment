'use strict';

var walletObject = require('../models/Wallet');
const logFile = require('../globalFunctions');
const moment = require('moment');
class WalletManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get all wallet
     * @return {List} list wallet
     */
    async getAllWallet() {
        try {
            var result = await this.dbConnect.Doquery('select * from wallet', {});
            if (result !== null && result.length > 0) {
                return result;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getAllWallet', __filename, 22, err);
            return null;
        }
    }

    /**
     * get wallet object by id
     * @param {String} id 
     * @return {Object} wallet
     */
    async getWalletById(id) {
        try {
            let result = [];
            result = await this.dbConnect.Doquery('select * from wallet where id = :id',
                                        {'id' : id});
            return (result.length > 0) ? new walletObject(result[0]) : null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWalletById', __filename, 41, err);
            return null;
        }
    }

    /**
     * get wallet object by walletid
     * @param {String} walletid 
     * @return {Object} wallet
     */
    async getWalletByWalletId(walletid) {
        try {
            let result = [];
            result = await this.dbConnect.Doquery('select * from wallet where walletid = :walletid',
                                        {'walletid' : walletid});
            return (result.length > 0) ? new walletObject(result[0]) : null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWalletByWalletId', __filename, 41, err);
            return null;
        }
    }

    /**
     * get wallet object by userid
     * @param {Number} userId 
     * @return {List} list wallets
     */
    async getWalletByUserId(userId) {
        try {
            var result = await this.dbConnect.Doquery('select wallet.id, wallet.walletid, wallet.name, wallettype.symbol, wallet.poolservice from wallet INNER JOIN wallettype on wallet.wallettypeid = wallettype.wallettypeid WHERE wallet.userid = :userId',
                                            {"userId" : userId});
            return result;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWalletByUserId', __filename, 58, err);
            return null;
        }
    }

    /**
     * get wallets by wallet type id
     * @param {Number} walletTypeId 
     * @return {List} list wallets
     */
    async getWalletByWalletTypeId(walletTypeId) {
        try {
            var result = await this.dbConnect.Doquery('select * from wallet where walletTypeId = :walletTypeId',
                                                {"walletTypeId" : walletTypeId});
            if (result !== null && result.length > 0) {
                return result;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWalletByWalletTypeId', __filename, 77, err);
            return null;
        }
    }

    /**
     * delete wallet by walletId
     * @param {String} walletId 
     */
    async deleteWalletById(walletId) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from wallet where walletid = :walletId', {"walletId" : walletId});
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('deleteWalletById', __filename, 92, err);
            return -1;
        }
    }

    /**
     * delete wallet by walletId
     * @param {String} userId 
     */
    async deleteWalletByUserId(userId) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from wallet where userid = :userId', {"userId" : userId});
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('deleteWalletByUserId', __filename, 107, err);
            return -1;
        }
    }

    /**
     * add new wallet
     * @param {Object} wallet
     * @return {Number} affectedRows
     */
    async addOrUpdateWallet(wallet) {
        try {
            let affectedRows = -1;
            let result = '';
            let id = wallet.getID() ? wallet.getID() : '';
            let existedWallet = await this.getWalletById(id);
            wallet.setLastUpdate(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            if (existedWallet === null) {
                result = await this.dbConnect.ExcuteInsert(`insert into wallet(walletid, userid, wallettypeid, poolservice, name, lastupdate)
                                                            values(:walletId, :userid, :walletTypeId, :poolservice, :name, :lastUpdate)`, wallet);
            } else if (existedWallet !== null && existedWallet.getUserId() == wallet.getUserId()) {
                result = await this.dbConnect.ExcuteUpdate(`update wallet set walletid = :walletId, userid = :userid, wallettypeid = :walletTypeId, poolservice = :poolservice, name = :name,
                                                                lastupdate = :lastUpdate where id = :id`, wallet);
            }
            return (result && result !== '') ? result.affectedRows : affectedRows;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('addNewWallet', __filename, 127, err);
            return -1;
        }
    }
}

module.exports = WalletManager;