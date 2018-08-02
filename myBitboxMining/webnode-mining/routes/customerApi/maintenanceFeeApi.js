var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const MaintenanceFeeManager = require('../../modelMgrs/MaintenanceFeeManager');

router.get('/maintenancefee', async (req, res, next)=> {
    try {
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let maintain = await MaintenanceFeeManager.getTotalMaintainFeeByField({
                customerId : req.session.customer.id,
                status: false
            });

            res.send({
                status: "success",
                data : maintain,
                errMessage : ""
            });
        }
    } catch (err) {
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
});
module.exports = router;
