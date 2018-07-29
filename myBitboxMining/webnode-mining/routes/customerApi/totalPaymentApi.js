var express = require('express');
var router = express.Router();

// import module
const moment = require('moment');

// import class manager
const TotalPaymentManager = require('../../modelMgrs/TotalPaymentManager');
const showMessage = require('../../global/ResourceHelper').showMessage;

router.get('/totalpayment/', async (req, res, next)=> {
    try {
        let listTotalPayment = await TotalPaymentManager.getTotalPaymentByField();
        let currentMonth = req.body.currentMonth;
        let dayInMonth = moment(currentMonth).date();// vi du moment('2018-07')
        let month = '';
        if (dayInMonth < 6) {
            month = moment(currentMonth).month();// vi du moment('2018-07') khong can phai -1 ma gia tri cua thang tinh tu 0-11
        } else {
            month = currentMonth;
        }
        res.send({
            status: "success",
            data : listTotalPayment,
            errMessage : ""
        });
    } catch (err) {
        res.send({
            status: "fail",
            data : null,
            errMessage : err.message
        });
    }
});
module.exports = router;
