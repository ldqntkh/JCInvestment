'use strict';

class User {
    constructor(UserObject) {
        UserObject && Object.assign(this, UserObject)
        /**
         * id: Number
         * username: String
         * email : String
         * password : String
         * phone: Number
         * fullname: String
         * userTypeId: Number
         * createAt: Date
         * updateAt: Date
         */
    }

    /**
     * get id of user
     * @return {Number} id
     */
    getId() {
        return this.id;
    }

    /**
     * set id for user
     * @param {Number} id 
     */
    setId(id) {
        this.id = id;
    }

    /**
     * get username of user
     * @return {String} username
     */
    getUsername() {
        return this.username;
    }

    /**
     * set username for user
     * @param {String} username 
     */
    setUsername(username) {
        this.username = username;
    }

    /**
     * get email of user
     * @return {String} email
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
     * get phone of user
     * @return {Number}
     */
    getPhone() {
        return this.phone;
    }

    /**
     * set phone of user
     * @param {Number} phone
     */
    setPhone(phone) {
        this.phone = phone;
    }

    /**
     * get fullname of user
     * @return {String}
     */
    getFullName() {
        return this.fullname;
    }

    /**
     * set fullname of user
     * @param {String} fullname
     */
    setFullName(fullname) {
        this.fullname = fullname;
    }

    /**
     * get userTypeId of user
     * @return {Number}
     */
    getUserTypeId() {
        return this.userTypeId;
    }

    /**
     * set userTypeId of user
     * @param {Number} userTypeId
     */
    setUserTypeId(userTypeId) {
        this.userTypeId = userTypeId;
    }

    /**
     * get createAt
     * @return {Date}
     */
    getCreateAt() {
        return this.createAt;
    }

    /**
     * set createAt
     * @param {Date} createAt
     */
    setCreateAt(createAt) {
        this.createAt = createAt;
    }

    /**
     * get updateAt
     * @return {Date}
     */
    getUpdateAt() {
        return this.updateAt;
    }

    /**
     * set updateAt
     * @param {Date} updateAt
     */
    setUpdateAt(updateAt) {
        this.updateAt = updateAt;
    }

}

module.exports = User;