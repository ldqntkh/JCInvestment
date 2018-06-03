var express = require('express');
var router = express.Router();

const globalFunc = require('../../../globalFunctions');
const PoolManager = require('../../../modelMgrs/PoolManager');

/**
 * API get all pool
 */
router.get(['/all'], async(req, res, next) => {
    try {
        let poolMgr = new PoolManager(req.app.locals._db);
        let results = await poolMgr.getAllPool();
        res.send({
            errCode: 0,
            data: results,
            errMessage: null
        });
    } catch(error) {
        globalFunc.writeLogFile('poolAPI-> get all pool', __filename, 44, error);
        res.send({
            errCode: -1,
            data: null,
            errMessage: 'The error message while get all pool: ' + error.message
        });
    }
});
module.exports = router;