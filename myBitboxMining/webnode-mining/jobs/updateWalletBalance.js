const schedule = require('node-schedule');
const fetch = require('node-fetch');
// import class manager
const WalletManager = require('../modelMgrs/WalletManager');
const CustomerManager = require('../modelMgrs/CustomerManager');

const rule = new schedule.RecurrenceRule();
rule.hour = 0;
rule.minute = 0;
rule.second = 0;

const urlInfo = 'https://min-api.cryptocompare.com/data/top/exchanges/full?fsym=ETH&tsym=USD';

var JobUpdateBalance = {
    UpdateWalletBalance : null,
    CoinInfo: {
        blockNumber: 0,
        netHashesPerSecond: 0,
        blockReward: 0,
        percent: 0.7
    },

    getCoinInfo: async() => {
        try {
            let response = await fetch(urlInfo);
            let jsonData = await response.json();

            if (jsonData.Response.toLowerCase() === 'success') {
                JobUpdateBalance.CoinInfo = {
                    blockNumber: jsonData.Data.CoinInfo.BlockNumber,
                    netHashesPerSecond: jsonData.Data.CoinInfo.NetHashesPerSecond,
                    blockReward: jsonData.Data.CoinInfo.BlockReward,
                    percent: 0.7
                }
                //console.log(JobUpdateBalance.CoinInfo)
            }
        } catch (err) {
            console.log(err);
        }
    },

    calculation: (hashrate)=> {
        hashrate = hashrate * 1000;
        return hashrate / (hashrate + JobUpdateBalance.CoinInfo.netHashesPerSecond) * JobUpdateBalance.CoinInfo.blockNumber * JobUpdateBalance.CoinInfo.blockReward * JobUpdateBalance.CoinInfo.percent ;
    },

    updateBalanceForCustomer: async(customerId) => {
        let wallets = await WalletManager.getListWalletWithCalculation([{
            customerId : customerId
        }]);

        // mỗi wallet sẽ lấy được hashrate
        // tính ra được số coin
        // update balance
        if (wallets !== null && wallets.length > 0) {
            for(let index = 0; index < wallets.length; index ++) {
                let wallet = wallets[index];
                if (wallet.hashrate > 0) {
                    let totalCoin = JobUpdateBalance.calculation(wallet.hashrate);
                    //console.log(wallet.hashrate);
                    WalletManager.updateBalance({
                        walletId: wallet.id,
                        balance: totalCoin,
                        customerId: customerId
                    });
                    //console.log('Update balance:' + wallet.id)
                }
            }
        }
    },

    execute: async ()=> {
        JobUpdateBalance.UpdateWalletBalance = schedule.scheduleJob(rule, async function(){
            await JobUpdateBalance.getCoinInfo();

            let customers = await CustomerManager.getListCustomer();
        
            if(customers !== null && customers.length > 0) {
                for(let index = 0; index < customers.length; index ++) {
                   //console.log('Update customer:' + customers[index].id)
                    JobUpdateBalance.updateBalanceForCustomer(customers[index].id);
                }
            }
        });
    }
}

module.exports = JobUpdateBalance;