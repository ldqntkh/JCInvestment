var express = require('express');
var moment = require('moment');
var router = express.Router();
var app = express();

const EthermineMgr = require('../../../modelMgrs/EthermineManager');
const NanoPoolMgr = require('../../../modelMgrs/NanoPoolManager');
const globalFunc = require('../../../globalFunctions');

/**
 * get wallet balance data 
 * active worker, unpaip balance, total balance
 */
router.get(['/:walletid/:pool/:screen'], async (req, res) => {
    let walletid = req.params.walletid,
        pool = req.params.pool,
		screen = req.params.screen;
		
    let result = '', poolServiceMgr = '';
    if (walletid === undefined || pool === undefined) {
        res.send({
            errCode: 1,
            data: null,
            errMessage: 'Error => Url not found'
        })
    }

    if (app.locals.cachedata && app.locals.cachedata[walletid] && app.locals.cachedata[walletid][pool]) {
        let wallet = app.locals.cachedata[walletid];
        if (wallet[pool][screen] && wallet[pool][screen].lastUpdate && wallet[pool][screen].lastUpdate.diff(moment(Date.now()), 'hours') < 1) {
            result = wallet[pool][screen];
        }
    }

    switch (pool) {
        case 'eth':
            // walletid test '0x310f31a700350202aBc4B20E0853Dd55413b6518'
            poolServiceMgr = new EthermineMgr();
            break;
        case 'nano':
            // walletid test '0xabab05fbff237f05a8344a1b4bc37230c13dbca2'
            poolServiceMgr = new NanoPoolMgr();
            break;
        default:
            break;
    }

    if (poolServiceMgr === '') {
        return res.send({
            errCode: 2,
            data: null,
            errMessage: 'Error => cannot find pool'
        });
    }

    if (result == '') {
		if(screen === 'mywallet') {
			result = await poolServiceMgr.getBalanceDetails(walletid);
			let activeWorker = result.activeWorker ? result.activeWorker : 0;
			let unpaidBalance = result.unpaidBalance ? result.unpaidBalance : 0;
			let totalBalance = result.totalBalance ? result.totalBalance : 0;
			if (activeWorker > 0 && unpaidBalance > 0 && totalBalance > 0) {
				result.lastUpdate = moment(Date.now());
				app.locals.cachedata = {
					[walletid]: {
						[pool]: {
							'mywallet': result
						}
					}
				}
			}
		} else {
			result = await poolServiceMgr.getEarningDetails(walletid);
			let ethPerMin = result.ethPerMin ? result.ethPerMin : 0;
			let usdPerMin = result.usdPerMin ? result.usdPerMin : 0;
			let btcPerMin = result.btcPerMin ? result.btcPerMin : 0;
			if (ethPerMin > 0 && usdPerMin > 0 && btcPerMin > 0) {
				result.lastUpdate = moment(Date.now());
				app.locals.cachedata = {
					[walletid]: {
						[pool]: {
							'myearning': result
						}
					}
				}
			}
		}	

    }
    res.send({
        errCode: 0,
        data: result,
        errMessage: null
    });
})

module.exports = router;