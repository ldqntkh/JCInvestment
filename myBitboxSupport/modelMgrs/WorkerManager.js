'use strict';

var workerObject = require('../models/Worker');
var moment = require('moment');
const logFile = require('../globalFunctions');
class WorkerManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get all workers
     * @return {List} list workers
     */
    async getAllWorkers() {
        try {
            var result = await this.dbConnect.Doquery('select * from worker', {});
            if (result !== null && result.length > 0) {
                return result;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getAllWorkers', __filename, 23, err);
            return null;
        }
    }

    /**
     * get worker by id
     * @return {Object} worker
     */
    async getWorkerById(workerId) {
        try {
            var result = await this.dbConnect.Doquery('select * from worker where workerid = :workerId',
                                                {"workerId" : workerId});
            if (result !== null && result.length > 0) {
                return new workerObject(result[0]);
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWorkerById', __filename, 41, err);
            return null;
        }
    }

    /**
     * get worker by id and wallet id
     * @return {Object} worker
     */
    async getWorkerByIdAndWalletId(workerId, walletId) {
        try {
            var result = await this.dbConnect.Doquery('select * from worker where workerid = :workerId and walletid = :walletId',
                                                {"workerId" : workerId, "walletId" : walletId});
            if (result !== null && result.length > 0) {
                return new workerObject(result[0]);
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWorkerByIdAndWalletId', __filename, 59, err);
            return null;
        }
    }

    /**
     * get workers by walletid
     * @return {List} list workers
     */
    async getWorkersByWalletID(walletId) {
        try {
            var result = await this.dbConnect.Doquery('select * from worker where walletid = :walletId', {"walletId" : walletId});
            if (result !== null && result.length > 0) {
                return result;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWorkersByWalletID', __filename, 76, err);
            return null;
        }
    }

    /**
     * delete workers by walletId
     * @param {String} walletId 
     */
    async deleteWorkersByWalletId(walletId) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from worker where walletId = :walletId', {"walletId" : walletId});
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('dêleteWorkersByWalletId', __filename, 91, err);
            return -1;
        }
    }

    /**
     * delete workers by worker id
     * @param {String} workerId 
     */
    async deleteWorkersByWorkerId(workerId) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from worker where workerid = :workerId', {"workerId" : workerId});
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('deleteWorkersByWorkerId', __filename, 106, err);
            return -1;
        }
    }

    /**
     * insert or update worker table by wallet address of worker object
     * @param {Object} workerObj 
     * @return {Number} affectedRows
     */
    async updateWorkerByObject(workerObj) {
        try {
            if (workerObj.workerId != '') {
                let obj = await this.getWorkerByIdAndWalletId(workerObj.workerId, workerObj.walletId);
                let affectedRows = -1;
                workerObj.setLastUpdate(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                if (obj) {
                    // update data
                    let result = await this.dbConnect.ExcuteUpdate('update worker set name = :name, totalhash = :totalhash, lastUpdate = :lastUpdate where workerId = :workerId', workerObj);
                    return result.affectedRows;
                } else {
                    // insert data
                    // check if get worker by id > 0 remove row by worker id
                    obj = await this.getWorkerById(workerObj.workerId);
                    if (obj !== null)
                        await this.deleteWorkersByWorkerId(workerObj.workerId);

                    let result = await this.dbConnect.ExcuteInsert(`insert into worker (workerid, walletid, name, totalhash, lastUpdate) 
                                                                    values(:workerId, :walletId, :name, :totalhash, :lastUpdate)`, workerObj);
                    return result.affectedRows;
                }
            }
            return affectedRows;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('updateWorkerByObject', __filename, 141, err);
            return -1;
        }
    }
}

module.exports = WorkerManager;