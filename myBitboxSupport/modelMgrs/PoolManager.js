const logFile = require('../globalFunctions');
class PoolManager {

    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get balance details of wallet
     * @param {String} wallettId 
     * @return {Object} {activeWorker, unpaidBalance, totalBalance}
     */
    async getBalanceDetails (wallettId) {
        return {}
    }

    /**
     * get earning details
     * @param {String} wallettId
     * @return {Object} {ethPerMin, usdPerMin, btcPerMin} 
     */
    async getEarningDetails(wallettId) {
        return {}
    }

    /**
     * get all pool
     * @return {List} list of pool
     */
    async getAllPool() {
        try {
            var result = await this.dbConnect.Doquery('select * from pool', {});
            if (result !== null && result.length > 0) {
                return result;
            } else return null;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('getAllPool', __filename, 12, err);
            return null;
        }
    }
}

module.exports = PoolManager;