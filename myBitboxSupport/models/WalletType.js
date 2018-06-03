'use strict';

class WalletType {
    constructor(WalletTypeObject) {
        WalletTypeObject && Object.assign(this, WalletTypeObject);
        /**
         * walletTypeId : Number
         * name : String
         * symbol : String
         * urlbalance: String
         * urltotalcoin: String
         * urlearning: String
         * lastUpdate : DateTime
         */
    }

    /**
     * get wallet type Id
     * @return {Number}
     */
    getWalletTypeId() {
        return this.walletTypeId;
    }

    /**
     * set new wallet type id
     * @param {Number} walletTypeId 
     */
    setWalletTypeId(walletTypeId) {
        this.walletTypeId = walletTypeId;
    }

    /**
     * get wallet type name
     * @return {String}
     */
    getWalletTypeName() {
        return this.name;
    }

    /**
     * set new name for wallet Id
     * @param {String} name 
     */
    setWalletTypeName(name) {
        this.name = name;
    }

    /**
     * get symbol
     * @return {String}
     */
    getSymbol() {
        return this.symbol;
    }

    /**
     * set symbol
     * @param {String} symbol symbol url
     */
    setSymbol(symbol) {
        this.symbol = symbol;
    }

    /**
     * get url balance
     * @returns {String} url balance
     */
    getUrlBalance() {
        return this.urlbalance;
    }

    /**
     * set url balance
     * @param {String} urlBalance 
     */
    setUrlBalance(urlBalance) {
        this.urlbalance = urlBalance;
    }

    /**
     * get url total coin
     * @returns {String} url total coin
     */
    getUrlTotalCoin() {
        return this.urltotalcoin;
    }

    /**
     * set url total coin
     * @param {String} urlTotalCoin 
     */
    setUrlTotalCoin(urlTotalCoin) {
        this.urltotalcoin = urlTotalCoin;
    }

    /**
     * get url earning
     * @returns {String} url earning
     */
    getUrlEarning() {
        return this.urlearning;
    }

    /**
     * set url earning
     * @param {String} urlEarning 
     */
    setUrlEarning(urlEarning) {
        this.urlearning = urlEarning;
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

module.exports = WalletType;