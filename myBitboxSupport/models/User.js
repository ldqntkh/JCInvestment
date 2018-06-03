'use strict';

class User {
    constructor(UserObject) {
        UserObject && Object.assign(this, UserObject)
        /**
         * userid : Number
         * email : String
         * password : String
         * fullname : String
         * phone : String
         * level : Number 0: admin, 1: client, 2: user support
         * active : Number 0:disable, 1:enable
         * token: String
         * lastUpdate : datetime
         */
    }

    /**
     * get user id
     * @return {Number} userID
     */
    getUserId() {
        //console.log('31231');
        //console.log(this);
        return this.userid;
    }

    /**
     * set user id
     * @return {Number} userID
     */
    setUserId(userid) {
        this.userid = userid;
    }

    /**
     * get email of user
     * @return {String} email of user
     */
    getEmail() {
        return this.email
    }

    /**
     * set email for user
     * @param {String} email 
     */
    setEmail(email) {
        this.email = email;
    }

    /**
     * get password of user
     * @return {String}
     */
    getPassword() {
        return this.password;
    }

    /**
     * set new password for user
     * @param {String} password 
     */
    setPassword(password) {
        this.password = password;
    }

    /**
     * get full name of user
     */
    getFullName() {
        return this.fullname;
    }

    /**
     * set new full name for user
     * @param {String} fullname 
     */
    setFullname(fullname) {
        this.fullname = fullname;
    }

    /**
     * get phone number of user
     * @return {String}
     */
    getPhoneNumber() {
        return this.phone;
    }

    /**
     * set new phone number for user
     * @param {String} phone 
     */
    setPhoneNumber(phone) {
        this.phone = phone;
    }

    /**
     * get type name of user
     * @return {String}
     */
    getLevel() {
        switch (this.level) {
            case 0: 
                return 'admin';
                break;
            case 1: 
                return 'client';
                break;
            case 2:
                return 'user';
                break;
        }
    }

    /**
     * set new type for user
     * @param {String} level 
     */
    setLevel(level) {
        switch(level.toUpperCase) {
            case 'CLIENT':
                this.level = 0;
                break;
            case 'ADMIN':
                this.level = 1;
                break;
            case 'USER':
                this.level = 2;
                break;
        }
    }

    /**
     * get status of user
     * @return {Number}
     */
    getActive() {
        return this.active;
    }

    /**
     * set new status for user
     * @param {Number} active 
     */
    setActive(active) {
        this.active = active;
    }

    /**
     * get token
     * @return {String}
     */
    getToken() {
        return this.token;
    }

     /**
     * get token
     * @param {String}
     */
    setToken(token) {
        this.token = token;
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

module.exports = User;