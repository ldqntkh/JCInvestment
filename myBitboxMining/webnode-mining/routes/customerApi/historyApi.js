var express = require('express');
var router = express.Router();

// import class manager
const CustomerHistoryManager = require('../../modelMgrs/CustomerHistoryManager');

router.get('/list', async (req, res, next) => {
    try {
        // check session or token
        if (typeof req.session.customer === 'undefined' || req.session.customer === null) {
            res.send({
                status: "fail",
                data : null,
                errMessage : "Authentication failed"
            });
        } else {
            let result = await CustomerHistoryManager.getListHistories({
                customerId : req.session.customer.id
            });
            res.send({
                status: "success",
                data : result,
                errMessage : null
            });
        }
    } catch(err) {
        console.log(err.message);
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
})

module.exports = router;