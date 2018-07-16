'use strict';

class WalletBalance {
    constructor(WalletBalanceObject) {
        WalletBalanceObject && Object.assign(this, WalletBalanceObject);
        /**
         * id : number
         * walletId : number
         * balance : number
         * userUpdate : Number
         * createAt: date
         * updateAt : date
         */
    }

    /**
     * get wallet id
     * @return {Number} walletId
     */
    getWalletBalanceId() {
        return this.id;
    }

    /**
     * set new balance
     * @param {Number} balance 
     */
    setBalance(balance) {
        this.balance = this.balance + balance;
    }

    setTimeUpdate(time) {
        this.updateAt = time;
    }
}

module.exports = WalletBalance;