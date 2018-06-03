'use strict';

class Support {

    constructor(SupportObject) {
        SupportObject && Object.assign(this, SupportObject);
        /**
         * supportId : String
         * userIdRq : Number
         * timeContact : DateTime
         * supportStatus : Number
         * userIdSp : Number
         * timeSupport : DateTime
         * lastUpdate : DateTime
         */
    }

    /**
     * get support Id
     * @return {String}
     */
    getSupportId() {
        return this.supportId;
    }

    /**
     * set new support ID
     * @param {String} supportId 
     */
    setSupportId(supportId) {
        this.supportId = supportId;
    }

    /**
     * get user id request support
     * @return {Number}
     */
    getUserIdRequest() {
        return this.userIdRequest;
    }

    /**
     * set new user id request support
     * @param {Number} userIdRq 
     */
    setUserIdRequest(userIdRq) {
        this.userIdRq = userIdRq;
    }

    /**
     * get first time user contact
     * @return {Date}
     */
    getTimeContact() {
        return this.timeContact;
    }

    /**
     * set new first time contact
     * @param {Date} timeContact 
     */
    setTimeContact(timeContact) {
        this.timeContact = timeContact;
    }

    /**
     * get status support
     * @return {Number}
     */
    getSupportStatus() {
        return this.supportStatus;
    }

    /**
     * set new support status
     * @param {Number} supportStatus 
     */
    setSupportStatus(supportStatus) {
        this.supportStatus = supportStatus;
    }

    /**
     * get user id support for client
     * @return {Number}
     */
    getUserIdSupport() {
        return this.userIdSp;
    }

    /**
     * set new user id support for client
     * @param {Number} userIdSp 
     */
    setUserIdSupport(userIdSp) {
        this.userIdSp = userIdSp;
    }

    /**
     * get first time user support for client
     * @return {Date}
     */
    getTimeSupport() {
        return this.timeSupport;
    }

    /**
     * set first time user support for client
     * @param {Date} timeSupport 
     */
    setTimeSupport(timeSupport) {
        this.timeSupport = timeSupport;
    }

    /**
     * get last time update
     * @return {DateTime}
     */
    getLastUpdate() {
        return this.lastUpdate;
    }

    /**
     * set new last time update
     * @param {DateTime} lastUpdate 
     */
    setLastUpdate(lastUpdate) {
        this.lastUpdate = lastUpdate;
    }
}

module.exports = Support;