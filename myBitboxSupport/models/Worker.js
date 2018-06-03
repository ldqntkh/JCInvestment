'use strict';

class Worker {
    constructor(WorkerObject) {
        WorkerObject && Object.assign(this, WorkerObject);
        /**
         * WorkerId : Number
         * walletId : String
         * name : String
         * totalhash: Number
         * lastUpdate : DateTime
         */
    }

    /**
     * get Worker id
     * @return {Number}
     */
    getWorkerId() {
        return this.workerId;
    }

    /**
     * set new WorkerId
     * @param {Number} WorkerId 
     */
    setWorkerId(WorkerId) {
        this.workerId = WorkerId;
    }

    /**
     * get wallet id
     * @return {String}
     */
    getWalletId() {
        return this.walletId;
    }

    /**
     * set new wallet id for Worker
     * @param {String} walletId 
     */
    setWalletId(walletId) {
        this.walletId = walletId;
    }

    /**
     * get Worker name
     * @return {String}
     */
    getWorkerName() {
        return this.name;
    }

    /**
     * set new Worker name
     * @param {String}
     */
    setWorkerName(name) {
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

    /**
     * get total hash
     * @param {Number} totalhash 
     */
    getTotalhash() {
        return this.totalhash;
    }

    /**
     * set new total hash
     * @return {DateTime} totalhash 
     */
    setTotalhash(totalhash) {
        this.totalhash = totalhash;
    }
}

module.exports = Worker;