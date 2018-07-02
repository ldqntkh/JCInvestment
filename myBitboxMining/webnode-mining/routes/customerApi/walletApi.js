var express = require('express');
var router = express.Router();

// import class manager
const WalletManager = require('../../modelMgrs/WalletManager')

router.get('/list', async (req, res, next)=> {
    if (req.session.customer === null) {
        res.send({
            status: "fail",
            data : null,
            errMessage : "Authentication failed"
        });
    } else {
        try {
            let listWallet = await WalletManager.getListWallet({
                customerid : req.session.customer.id
            });
            res.send({
                status: "success",
                data : listWallet,
                errMessage : ""
            });
        } catch (err) {
            res.send({
                status: "fail",
                data : null,
                errMessage : err.message
            });
        }
    }
});

module.exports = router;
