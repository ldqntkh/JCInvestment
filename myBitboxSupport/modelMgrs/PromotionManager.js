'use strict';

let promotionObject = require('../models/Promotion');
const logFile = require('../globalFunctions');

class PromotionManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
    * get all promotion
    * @return {Array} promotions
    */
    async getAllPromotion() {
        try {
            let promotions = await this.dbConnect.Doquery('select * from promotion', {});
            if (promotions != null && promotions.length > 0) {
                return promotions;
            }
            return null;
        } catch(error) {
            logFile.writeLogFile('getAllPromotion', __filename, 23, error);
            return null;
        }
    }

    /**
    * get promotion by id
    * @param {String} promotionId
    * @return {Object} promotion
    */
    async getPromotionById(promotionId) {
        try {
            let promotion = '';
            if (promotionId != '') {
                promotion = await this.dbConnect.Doquery('select * from promotion where promotionid = :promotionId', {'promotionId': promotionId});
                if (promotion != '' && promotion.length > 0) {
                    return new promotionObject(promotion[0]);
                }
            }
            return promotion;
        } catch(error) {
            logFile.writeLogFile('getPromotionById', __filename, 41, error);
            return null;
        }
    }

    /**
    * delete all promotion
    * @return {Number} affectedRows
    */
    async deleteAllPromotion() {
        try {
            let result = await this.dbConnect.ExcuteDelete('delete from promotion', {});
            return (result && result.affectedRows) ? result.affectedRows : 0;
        } catch(error) {
            logFile.writeLogFile('deleteAllPromotion', __filename, 59, error);
            return null;
        }
    }

    /**
    * delete promotion by id
    * @param {String} promotionId
    * @return {Number} affectedRows
    */
    async deletePromotionById(promotionId) {
        try {
            if (promotionId != '') {
                let result = await this.dbConnect.ExcuteDelete('delete from promotion where promotionid = :promotionId', {'promotionId': promotionId});
                return (result && result.affectedRows) ? result.affectedRows : 0;
            }
        } catch (error) {
            logFile.writeLogFile('deletePromotionById', __filename, 79, error);
            return null;
        }
    }

    /**
     * insert or update table promotion by worker object
     * @param {Object} promotionObj 
     * @return {Number} affectedRows
     */
    async insertOrUpdatePromotion(promotionObj) {
        try {
            if (promotionObj.promotionId != '') {
                let promotionObj = await this.getPromotionById(promotionObj.promotionId);
                let affectedRows = -1;
                promotionObj.setLastUpdate(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
                if (promotionObj) {
                    // update data
                    let result = await this.dbConnect.ExcuteUpdate(`update promotion set name = :name, imageurl = :imageUrl, weburl = :webUrl, description = :description,
                                                                    enddate = :endDate, lastUpdate = :lastUpdate where workerId = :workerId`, promotionObj);
                    if (result != '' && result.length > 0) {
                        affectedRows = result.affectedRows;
                    }
                } else {
                    // insert data
                    let result = await this.dbConnect.ExcuteInsert(`insert into promotion (promotionid, userid, name, imageurl, weburl, description, active, enddate, lastUpdate) 
                                                                    values(:promotionId, :userId, :name, :imageUrl, :webUrl, :description, :active, :endDate, :lastUpdate)`, promotionObj);
                    if (result != '' && result.length > 0) {
                        affectedRows = result.affectedRows;
                    }
                }
            }
            return affectedRows;
        } catch(err) {
            logFile.writeLogFile('insertOrUpdatePromotion', __filename, 99, error);
            return null;
        }
    }
}
module.exports = PromotionManager;
