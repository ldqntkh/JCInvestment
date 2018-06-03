'use strict';

let express = require('express');
let router = express.Router();
let moment = require('moment');

const PromotionManager = require('../../../modelMgrs/PromotionManager');
const PromotionObject = require('../../../models/Promotion');
const UserManager = require('../../../modelMgrs/UserManager');
const globalFunc = require('../../../globalFunctions');

/* GET all promotion */
router.get(['/all'], async (req, res) => {
    try {
        let promotionManager = new PromotionManager(req.app.locals._db);
        let promotions = await promotionManager.getAllPromotion();
        res.send({
            errorCode: 0,
            data: promotions,
            errMessage: null
        });
    } catch(error) {
        globalFunc.writeLogFile('getAllPromotion: ' + err);
        return -1;
    }
});

/** GET promotion by id
* @return {Object} promotion
* @error code:     0: get promotion successfully
*                  1: can not get promotion
*/
router.get(['/promotion/:promotionId'], async (req, res) => {
    try {
        let promotionId = req.params.promotionId ? req.params.promotionId : '';
        let promotion = await new PromotionManager(req.app.locals._db).getPromotionById(promotionId);
        if (promotion != '') {
            res.send({
                errorCode: 0,
                data: promotion,
                errMessage: null
            });
        } else {
            res.send({
                errorCode: 1,
                data: null,
                errMessage: 'Can not find promotion. Please try again'
            });
        }
    } catch(error) {
        LogFile.writeLogFile('getPromotionById: ' + err);
        return -1;
    }
});
module.exports = router;
