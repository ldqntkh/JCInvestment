'use strict';

var WorkerDetailObject = require('../models/Workerdetail');
const logFile = require('../globalFunctions');
class WorkerDetailManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get workerdetail by id
     * @return {Object} worker detail object
     */
    async getWorkerDetailById(workerId) {
        try {
            var result = await this.dbConnect.Doquery('select * from workerdetail where workerid = :workerId',
                                                {"workerId" : workerId});
            if (result !== null && result.length > 0) {
                var workerDetailObj = new WorkerDetailObject(result[0]);
                return workerDetailObj;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getWorkerDetailById', __filename, 24, err);
            return null;
        }
    }

    /**
    * Insert workder detail table
    * @param {String} workerId
    * @param {Array} workers
    * @return {Number}  0 when insert all worker detail success
    *                  -1 when insert all worker detail have issue
    */
    async updateWorkerDetail(workerId, workers) {
        try {
            if (workerId != '') {
                let workerDetailObj = new WorkerDetailObject();
                let existedWorkerDetail = await this.getWorkerDetailById(workerId);
                let affectedRows = [];
                if (existedWorkerDetail ) {
                    await this.deleteWorkerDetail(workerId);
                }
                workerDetailObj.setWorkerId(workerId);
                for (let worker of workers) {
                    let gpu = worker.gpu ? worker.gpu : 0;
                    let temp = worker.temp ? worker.temp : 0;
                    let fan = worker.fan ? worker.fan : 0;
                    let hashrate = worker.hashrate ? worker.hashrate : 0;
                    workerDetailObj.setGpu(gpu);
                    workerDetailObj.setTemperature(temp);
                    workerDetailObj.setFanSpeed(fan);
                    workerDetailObj.setHashRate(hashrate);
                    let result = await this.dbConnect.ExcuteInsert(`insert into workerdetail (workerid, gpu, temp, fan, hashrate) 
                                                    values(:workerId, :gpu, :temp, :fan, :hashrate)`, workerDetailObj);
                }
                return 0;
            } else {
                return -1;
            }
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('updateWorkerDetail', __filename, 64, err);
            return -1;
        }
    }

    /**
    * Insert workder detail table
    * @param {String} detailId
    * @return {Number} affectedRows
    */
    async deleteWorkerDetail(workerId) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from workerdetail where workerid = :workerId', {'workerId': workerId});
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('deleteWorkerDetail', __filename, 80, err);
            return -1;
        }
    }

    /**
    * get all workerdetail by worker id
    * @return {Array} workerDetails
    */
    async getAllWorkersDetail(workerId) {
        try {
            var result = await this.dbConnect.Doquery('select * from workerdetail where workerid = :workerId',
                                                {"workerId" : workerId});
            if (result !== null && result.length > 0) {
                return result;
            } else {
                return null;
            }
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getAllWorkerDetail', __filename, 100, err);
            return null;
        }
    }
}

module.exports = WorkerDetailManager;