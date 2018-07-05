'use strict';

class Wallet {
    constructor(WalletObject) {
        WalletObject && Object.assign(this, WalletObject);
        /**
         * id : number
         * walletAddress : String
         * walletName : String
         * walletTypeId : Number
         * customerId : Number
         * createAt: date
         * updateAt : date
         */
    }

    /**
     * get wallet id
     * @return {Number} walletId
     */
    getWalletId() {
        return this.id;
    }

    /**
     * get wallet address
     * @return {String} wallet address
     */
    getWalletAddress() {
        return this.walletAddress;
    }
}

module.exports = Wallet;