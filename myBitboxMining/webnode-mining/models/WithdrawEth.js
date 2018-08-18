'use strict';

class WithdrawEth {
    constructor(WithdrawEthObj) {
        WithdrawEthObj && Object.assign(this, WithdrawEthObj);
        /**
         * id: Number
         * customerId: Number
         * walletId: Number
         * total_eth : Number
         * description: String
         * status: Number
         * createAt: Date
         * updateAt: Date
         */
    }

    getWithDrawId () {
        return this.id
    }

    getCustomerId () {
        return this.customerId;
    }

    getStatus() {
        return this.status;
    }

    getWalletId() {
        return this.walletId;
    }

    getTotalEth() {
        return this.total_eth;
    }

    setStatus(status) {
        this.status = status;
    }

    setUpdateAt(updateAt) {
        this.updateAt = updateAt;
    }
}
module.exports = WithdrawEth;