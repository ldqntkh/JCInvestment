'use strict';

class Workerdetail {

    constructor(WorkerdetailObject) {
        WorkerdetailObject && Object.assign(this, WorkerdetailObject);
        /**
         * detailid : Number
         * workerId : String
         * gpu : Number
         * hashrate : Number
         * temp : Number
         * fan : Number
         * lastUpdate : DateTime
         */
    }

    /**
     * get Workerdetail id
     * @return {Number}
     */
    getWorkerdetailId() {
        return this.detailId;
    }

    /**
     * set new info id
     * @param {Number} WorkerdetailId 
     */
    setWorkerdetailId(WorkerdetailId) {
        this.detailId = WorkerdetailId;
    }

    /**
     * get worker id
     * @return {String}
     */
    getWorkerId() {
        return this.workerId;
    }

    /**
     * set new worker id for Workerdetail
     * @param {String} workerId 
     */
    setWorkerId(workerId) {
        this.workerId = workerId;
    }

    /**
     * get gpu name
     * @return {Number}
     */
    getGpu() {
        return this.gpu;
    }

    /**
     * set new gpu name
     * @param {Number} gpu
     */
    setGpu(gpu) {
        this.gpu = gpu;
    }

    /**
     * get hashrate
     * @return {String}
     */
    getHashRate() {
        return this.hashrate;
    }

    /**
     * set new hashrate
     * @param {Number} hashrate 
     */
    setHashRate(hashrate) {
        this.hashrate = hashrate;
    }

    /**
     * get temperature
     * @return {Number}
     */
    getTemperature() {
        return this.temp;
    }

    /**
     * set new temperature
     * @param {Number} temp 
     */
    setTemperature(temp) {
        this.temp = temp;
    }

    /**
     * get fan speed
     * @return {Number}
     */
    getFanSpeed() {
        return this.fan;
    }

    /**
     * set new fan speed
     * @param {Number} fanSpeed 
     */
    setFanSpeed(fanSpeed) {
        this.fan = fanSpeed;
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

module.exports = Workerdetail;