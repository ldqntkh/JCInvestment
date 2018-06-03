const fetch = require('node-fetch');
const globalFunc = require('../globalFunctions');
const PoolManager = require('./PoolManager');

const balanceDetailsUrl = 'https://eth.nanopool.org/api/v1/load_account/{0}';
const hashrateUrl = 'https://api.nanopool.org/v1/eth/avghashrate/{0}';
const earningUrl = 'https://api.nanopool.org/v1/eth/approximated_earnings/:hashrate';
const errMessage = 'The problem when connecting to nano server';

class NanoPoolManager extends PoolManager {

    async getBalanceDetails (walletId) {
        let balanceDetails = {
            activeWorker: 0,
            unpaidBalance: 0,
            totalBalance: 0
        }

        try {
            let url = balanceDetailsUrl.replace('{0}', walletId);
            let response = await fetch(url);
            response = await response.json();
            if (response.status === true) {
                if (typeof(response.data) === 'object') {
                    balanceDetails = {
                        activeWorker: response.data.userParams.w_count,
                        unpaidBalance: response.data.userParams.balance,
                        totalBalance: response.data.userParams.e_sum
                    }
                }
            }
        } catch(err) {
            globalFunc.writeLogFile('getBalanceDetails', 'NanoPoolManager', 42, err.message);
            balanceDetails.errMessage = errMessage;
        }
        return balanceDetails;
    }

    async getEarningDetails(wallettId) {
        let hashrate_1h = 0;
        let earningDetails = {
            ethPerMin: 0,
            usdPerMin: 0,
            btcPerMin: 0
        };
        try {
            let url = hashrateUrl.replace('{0}', wallettId);
            let response = await fetch(url);
            response = await response.json();
            if (response.status === true) {
                if (response.data instanceof Object) {
                    hashrate_1h = response.data.h1;
                }
            }

            url = earningUrl.replace(':hashrate', hashrate_1h.toString());

            response = await fetch(url);
            response = await response.json();
            if (response.status === true) {
                if (response.data instanceof Object) {
                    earningDetails = {
                        ethPerMin: response.data.minute.coins,
                        btcPerMin: response.data.minute.bitcoins,
                        usdPerMin: response.data.minute.dollars
                    }
                }
            }
        } catch(err) {
            globalFunc.writeLogFile('getEarningDetails', 'NanoPoolManager', 43, err.message);
            earningDetails.errMessage = errMessage;
        }
        return earningDetails;
    }
}

module.exports = NanoPoolManager;