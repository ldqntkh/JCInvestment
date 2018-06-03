'use strict';

class Wallet {
    constructor(WalletIdObject) {
        WalletIdObject && Object.assign(this, WalletIdObject);
        /**
         * id: Number
         * walletid : String
         * userid : Number
         * walletTypeId : number
         * poolservice: String
         * name : String
         * lastUpdate : DateTime
         */
    }

    /**
     * get id
     * @return {Number} id
     */
    getID() {
        return this.id;
    }

    /**
     * set id
     * @param {Number} id 
     */
    setID(id) {
        this.id = id;
    }

    /**
     * get wallet id
     * @return {String}
     */
    getWalletId() {
        return this.walletid;
    }

    /**
     * set new walletId
     * @param {String} walletId 
     */
    setWalletId(walletId) {
        this.walletid = walletId;
    }

    /**
     * get user id
     * @return {Number}
     */
    getUserId() {
        return this.userid;
    }

    /**
     * set new userId for walletID
     * @param {Number} userId 
     */
    setUserId(userId) {
        this.userid = userId;
    }

    /**
     * get wallet type id
     * @return {Number}
     */
    getWalletTypeId() {
        return this.walletTypeId;
    }

    /**
     * set new wallet type ID
     * @param {Number} walletTypeId 
     */
    setWalletTypeId(walletTypeId) {
        this.walletTypeId = walletTypeId;
    }

     /**
     * get pool service
     * @return {String}
     */
    getPoolService() {
        return this.poolservice;
    }

     /**
     * set pool service
     * @param {String}
     */
    setPoolService(poolService) {
        this.poolservice = poolService;
    }

    /**
     * get wallet name
     * @return {String}
     */
    getWalletName() {
        return this.name;
    }

    /**
     * set new name for wallet
     * @param {String}
     */
    setWalletName(name) {
        this.name = name;
    }

     /**
     * get last time update
     * @return {DateTime}
     */
    getLastUpdate() {
        return this.lastUpdate;
    }

    /**
     * set new last time update
     * @param {DateTime} lastUpdate 
     */
    setLastUpdate(lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
}

module.exports = Wallet;