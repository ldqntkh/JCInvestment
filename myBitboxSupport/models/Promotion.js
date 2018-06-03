'use strict';

class Promotion {
    constructor(PromotionObject) {
        PromotionObject && Object.assign(this, PromotionObject);
        /**
        * promotionid: String
        * userid: Number
        * name String
        * imageurl String
        * weburl String
        * description String
        * active Number
        * enddate DateTime
        * lastupdate DateTime
        */
    }

    /**
    * get promotion id
    * @return {String} promotionId
    */
    getPromotionId() {
        return this.promotionId;
    }

    /**
    * set promotion id
    * @param {String} promotionId
    */
    setPromotionId(promotionId) {
        this.promotionId = promotionId;
    }

    /**
    * get user id
    * @return {String} userid
    */
    getUserId() {
        return this.userId;
    }

    /**
    * set user id
    * @param {String} userId
    */
    setUserId(userId) {
        this.userId = userId;
    }

    /**
    * get promotion name
    * @return {String} name
    */
    getName() {
       return this.name;
    }

   /**
    * set promotion name
    * @param {String} name
    */
    setName(name) {
        this.name = name;
    }

    /**
    * get image url
    * @return {String} imageUrl
    */
    getImageUrl() {
        return this.imageUrl;
    }

    /**
    * set image url
    * @param {String} imageUrl
    */
    setImageUrl(imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
    * get web url
    * @return {String} webUrl
    */
    getWebUrl() {
        return this.webUrl;
    }

    /**
    * set web url
    * @param {String} webUrl
    */
    setWebUrl(webUrl) {
        this.webUrl = webUrl;
    }

    /**
    * get description
    * @return {String} description
    */
    getDescription() {
        return this.description;
    }

    /**
    * set description
    * @param {String} description
    */
    setDescription(description) {
        this.description = description;
    }

    /**
    * get active
    * @return {Number} active
    */
    getActive() {
        return this.active;
    }

    /**
    * set active
    * @return {Number} active
    */
    setActive(active) {
        this.active = active;
    }

    /**
    * get end date
    * @return {Date} enddate
    */
    getEndDate() {
        return this.endDate;
    }

    /**
    * set end date
    * @param {Date} endDate
    */
    setEndDate(endDate) {
        this.endDate = this.endDate;
    }

    /**
    * get last update
    * @return {Date} lastUpdate
    */
    getLastUpdate() {
        return this.lastUpdate;
    }

    /**
    * set last update
    * @param {Date} lastUpdate
    */
    setLastUpdate(lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
}
module.exports = Promotion;
