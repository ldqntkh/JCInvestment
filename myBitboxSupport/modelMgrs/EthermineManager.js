
const fetch = require('node-fetch');
const globalFunc = require('../globalFunctions');
const PoolManager = require('./PoolManager');

const urlBalance = 'https://api.ethermine.org/miner/{0}/currentStats';
// const urlTotalEth = 'https://api.etherscan.io/api?module=account&action=balance&address={0}&tag=latest&apikey=2DGIT6CTKPF1BNE6223YEPKFYZQPXPTKMB';
const urlTotalEth = 'https://api.etherscan.io/api?module=account&action=balance&address={0}&tag=latest&apikey=2PACY4J3U33AS97236593XXQD1C9E7PJR2';
const urlWalletPayouts = "https://api.ethermine.org/miner/{0}/dashboard/payouts";
const errMessage = 'The problem when connecting to eth server';
class EthermineManager extends PoolManager {

    async getBalanceDetails (wallettId) {
        let balanceDetails = {
            activeWorker: 0,
            unpaidBalance: 0,
            totalBalance: 0
        }
        try {
            let url = urlBalance.replace('{0}', wallettId);
            let response = await fetch(url);
            response = await response.json();
            if (response.status === 'OK') {
                if (typeof(response.data) === 'object') {
                    balanceDetails.activeWorker = response.data.activeWorkers;
                    balanceDetails.unpaidBalance = response.data.unpaid / 1000000000000000000;
                }
            }

            url = urlTotalEth.replace('{0}', wallettId);
            response = await fetch(url);
            response = await response.json();
            if (response.status === '1') {
                balanceDetails.totalBalance = parseFloat(response.result) / 1000000000000000000;
            } else {
                balanceDetails.errMessage = 'Your wallet address is invalid. Please check your wallet address';
            }
        } catch(err) {
            globalFunc.writeLogFile('getBalanceDetails', 'EthermineManager', 31, err.message);
            balanceDetails.errMessage = errMessage;
        }

        return balanceDetails;
    }

    async getEarningDetails(wallettId) {
        let earningDetails = {
            ethPerMin: 0,
            usdPerMin: 0,
            btcPerMin: 0
        }
        try {
            let url = urlWalletPayouts.replace('{0}', wallettId);
            let response = await fetch(url);
            response = await response.json();
            if (response.status == 'OK') {
                if (response.data instanceof Object) {
                    if (response.data.estimates) {
                        if (response.data.estimates.coinsPerMin != null) earningDetails.ethPerMin = parseFloat(response.data.estimates.coinsPerMin.toString());
                        if (response.data.estimates.usdPerMin != null) earningDetails.usdPerMin = parseFloat(response.data.estimates.usdPerMin.toString());
                        if (response.data.estimates.btcPerMin != null) earningDetails.btcPerMin = parseFloat(response.data.estimates.btcPerMin.toString());
                    }
                }
            }
        } catch(err) {
            globalFunc.writeLogFile('getEarningDetails', 'EthermineManager', 32, err.message);
            earningDetails.errMessage = errMessage;
        }
        return earningDetails;
    }
}

module.exports = EthermineManager;