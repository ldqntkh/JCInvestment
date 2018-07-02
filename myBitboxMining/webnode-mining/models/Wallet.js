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

}

module.exports = Wallet;