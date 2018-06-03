var express = require('express');
var moment = require('moment');
var router = express.Router();

const WorkerManager = require('../../../modelMgrs/WorkerManager');
const WorkerDetailManager = require('../../../modelMgrs/WorkerDetailManager');
const WalletManager = require('../../../modelMgrs/WalletManager');
const UserManager = require('../../../modelMgrs/UserManager');
const WorkerObject = require('../../../models/Worker');
const WorkerDetailObject = require('../../../models/Workerdetail');
const globalFunc = require('../../../globalFunctions');

/* GET all workers */
router.get(['/'], async (req, res, next) => {
    var workersMgr = new WorkerManager(req.app.locals._db);
    var workers = await workersMgr.getAllWorkers();
    if (workers !== null) {
        
        res.send({
            errCode: 0,
            data: workers,
            errMessage: null
        });
    } else {
        res.send({
            errCode: 1,
            data: null,
            errMessage: 'Error => cannot find workers'
        });
    }
});

/* GET all workers by wallet address */
router.get(['/wallet/:walletid'], async (req, res, next) => {
    let walletid = req.params.walletid;
    if (walletid !== null) {
        var workersMgr = new WorkerManager(req.app.locals._db);
        var workers = await workersMgr.getWorkersByWalletID(walletid);
        if (workers !== null) {
            res.send({
                errCode: 0,
                data: workers,
                errMessage: null
            });
        } else {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'Error => cannot find workers with wallet address: ' + walletid
            });
        }
    } else {
        res.send({
            errCode: 2,
            data: null,
            errMessage: 'Error => cannot find wallet address'
        });
    }
});

/* GET delete all workers by wallet address  */
router.post(['/wallet/:walletid/deleteall'], async (req, res, next) => {
    let walletid = req.params.walletid ? req.params.walletid : '';
    let token = req.body.token ? req.body.token : '';
    if (token != '') {
        let user = JSON.parse(globalFunc.decrypt(token));
        let userMgr = new UserManager(req.app.locals._db);
        let existedUser = userMgr.getUserById(user.userId);

        if (existedUser && walletid != '') {
            var workersMgr = new WorkerManager(req.app.locals._db);
            var result = await workersMgr.deleteWorkersByWalletId(walletid);
            if (result > 0) {
                res.send({
                    errCode: 0,
                    data: null,
                    errMessage: null
                });
            } else {
                res.send({
                    errCode: result,
                    data: null,
                    errMessage: 'Error => cannot delete worker by wallet address ' + walletid
                });
            }
        } else {
            res.send({
                errCode: -2,
                data: null,
                errMessage: 'Error => cannot find user or worker '
            });
        }
    }
});

/* GET worker by worker id  */
router.get(['/worker/:workerid'], async (req, res, next) => {
    let workerid = req.params.workerid;
    if (workerid !== null) {
        var workersMgr = new WorkerManager(req.app.locals._db);
        var worker = await workersMgr.getWorkerById(workerid);
        if (worker !== null) {
            res.send({
                errCode: 0,
                data: worker,
                errMessage: null
            });
        } else {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'Error => cannot find workers with worker id: ' + workerid
            });
        }
    } else {
        res.send({
            errCode: 2,
            data: null,
            errMessage: 'Error => cannot find worker'
        });
    }
});

/* GET delete worker by worker id  */
router.get(['/worker/:workerid/delete'], async (req, res, next) => {
    let workerid = req.params.workerid;
    if (workerid !== null) {
        var workersMgr = new WorkerManager(req.app.locals._db);
        var result = await workersMgr.deleteWorkersByWorkerId(workerid);
        if (result > 0) {
            res.send({
                errCode: 0,
                data: null,
                errMessage: null
            });
        } else {
            res.send({
                errCode: result,
                data: null,
                errMessage: 'Error => cannot delete worker by id ' + workerid
            });
        }
    } else {
        res.send({
            errCode: -2,
            data: null,
            errMessage: 'Error => cannot find worker'
        });
    }
});

/** POST update or insert data worker
* Key value: data
* @param {String} workerId
* @param {String} walletId
* @param {String} name
* @param {Number} totalhash
* @return {Object} response
* Error code:  -1: error from server
*               0: insert or update data worker success
*               1: error when trying to insert or update data worker
*               2: error when no wallet is found
*               3: error when request data is invalid from client
*/
router.post(['/worker/handle'], async (req, res, next) => {
    try {
        let data = req.body.data;
        if (data) {
            let workerId = data.workerId ? data.workerId : '';
            let walletId = data.walletId ? data.walletId : '';
            let workersMgr = new WorkerManager(req.app.locals._db);
            let workerDetailMgr = new WorkerDetailManager(req.app.locals._db);
            let walletMgr = new WalletManager(req.app.locals._db);
            let existedWallet = await walletMgr.getWalletByWalletId(walletId);
            if (existedWallet) {
                let name = data.name ? data.name : '';
                let workers = data.workers ? data.workers : [];
                let totalhash = 0;
                for (let worker of workers) {
                    let hashrate = worker.hashrate ? worker.hashrate : 0;
                    totalhash += hashrate;
                }
                let workerObj = new WorkerObject({
                    "workerId" : workerId,
                    "walletId" : walletId,
                    "name" : name,
                    "totalhash" : totalhash
                });

                let result = await workersMgr.updateWorkerByObject(workerObj);
                let workerDetailResult = await workerDetailMgr.updateWorkerDetail(workerId, workers);
                if (result > 0 && workerDetailResult >= 0) {
                    res.send({
                        errCode: 0,
                        data: workerObj,
                        successMessage: 'Insert or update data worker successfully'
                    });
                } else {
                    res.send({
                        errCode: 1,
                        data: null,
                        errMessage: 'Error => cannot update or inset data for worker with id ' + workerId
                    });
                }
            } else {
                res.send({
                    errCode: 2,
                    data: null,
                    errMessage: 'Can not find your wallet. Please create wallet before adding wallet'
                });
            }
        } else {
            res.send({
                errCode: 3,
                data: null,
                errMessage: 'The data that you are requesting is invalid. Please try again'
            });
        }
    } catch (err) {
        //console.log(err.message);
        globalFunc.writeLogFile('workerAPI-> post worker/handle', __filename, 242, err);
        res.send({
            errCode: -1,
            data: null,
            errMessage: 'Error => not found'
        });
    }
});

/** GET list data worker
* @param {String} walletId
* @return {Object} response
* Error code:  -1: error when server has some problems
*               0: get data worker success
*               1: can not find worker by wallet id
*               2: can not get data of worker
*/
router.get(['/worker/list/:walletId'], async (req, res) => {
    try {
        let walletId = req.params.walletId ? req.params.walletId : '';
        let workerMgr = new WorkerManager(req.app.locals._db);
        let workerDetailMgr = new WorkerDetailManager(req.app.locals._db);
        let workers = await workerMgr.getWorkersByWalletID(walletId);
        if (workers && workers.length > 0) {
            let dataWorkers = [];
            let dataWorkerDetails = []; 
            for (let worker of workers) {
                let current = moment(Date.now());
                let lastUpdate = moment(worker.lastupdate);
                dataWorkers.push({
                    workerId: worker.workerid,
                    workerName: worker.name,
                    status : (current.diff(lastUpdate, 'minutes') > 6) ? false : true,
                    hashrate: worker.totalhash
                });
            }
            if (dataWorkers.length > 0) {
                res.send({
                    errCode: 0,
                    data: dataWorkers,
                    errMessage: null
                });
            } else {
                res.send({
                    errCode: 2,
                    data: null,
                    errMessage: 'Can not get data of worker. Please try again'
                });
            }
        } else {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'Can not find a worker. Please try to add worker first'
            });
        }
    } catch(err) {
        globalFunc.writeLogFile('workerAPI-> get worker/list/:walletId', __filename, 305, err);
        res.send({
            errCode: -1,
            data: null,
            errMessage: 'Server is having problem'
        });
        //console.log(err);
    }
});

/** GET list data worker detail
* @param {String} workerId
* @return {Object} response
* Error code:  -1: error when server has some problems
*               0: get data worker detail success
*               1: can not find worker detail by worker id
*               2: error when requesting data is invalid
*/
router.get(['/worker/list/:workerId/detail'], async (req, res) => {
    try {
        let workerId = req.params.workerId ? req.params.workerId : '';
        if (workerId != '') {
            let workerDetailMgr = new WorkerDetailManager(req.app.locals._db);
            let workerDetails = await workerDetailMgr.getAllWorkersDetail(workerId);
            if (workerDetails && workerDetails.length > 0) {
                res.send({
                    errCode: 0,
                    data: workerDetails,
                    errMessage: null
                });
            } else {
                res.send({
                    errCode: 1,
                    data: null,
                    errMessage: 'Can not get data of worker detail. Please try again'
                });
            }
        } else {
            res.send({
                errCode: 2,
                data: null,
                errMessage: 'The request data is invalid. Please try again.'
            });
        }
    } catch(err) {
        globalFunc.writeLogFile('workerAPI-> get worker/list/:workerId/detail', __filename, 344, err);
        res.send({
            errCode: -1,
            data: null,
            errMessage: 'Server is having problem'
        });
        //console.log(err);
    }
});

/* GET all worker details by worker id */
router.get(['/wallet/:walletid/:workerid'], async (req, res, next) => {
    let walletid = req.params.walletid; // chỉ dùng để xác thực url. Không dùng trong tìm kiếm database
    let workerid = req.params.workerid;
    if (walletid !== null && workerid !== null) {
        var workerDetailMgr = new WorkerDetailManager(req.app.locals._db);
        var workersDetailObj = await workerDetailMgr.getWorkerDetailById(workerid);
        if (workersDetailObj !== null) {
            res.send({
                errCode: 0,
                data: workersDetailObj,
                errMessage: null
            });
        } else {
            res.send({
                errCode: 1,
                data: null,
                errMessage: 'Error => cannot find worker detail with workerid: ' + workerid
            });
        }
    } else {
        res.send({
            errCode: 2,
            data: null,
            errMessage: 'Error => cannot find worker id'
        });
    }
});
module.exports = router;
