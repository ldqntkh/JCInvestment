'use strict';

class Customer {
    constructor(CustomerObject) {
        CustomerObject && Object.assign(this, CustomerObject)
        /**
         * email : String
         * password : String
         * phone: Number
         * fullname: String
         * birthday: Date
         * active: Number
         * createAt: Date
         * updateAt: Date
         */
    }

    /**
     * get email of customer
     * @return {String} email
     */
    getEmail() {
        return this.email
    }

    /**
     * set email for customer
     * @param {String} email 
     */
    setEmail(email) {
        this.email = email;
    }

    /**
     * get password of customer
     * @return {String}
     */
    getPassword() {
        return this.password;
    }

    /**
     * set new password for customer
     * @param {String} password 
     */
    setPassword(password) {
        this.password = password;
    }

    /**
     * get phone of customer
     * @return {Number}
     */
    getPhone() {
        return this.phone;
    }

    /**
     * set phone of customer
     * @param {Number} phone
     */
    setPhone(phone) {
        this.phone = phone;
    }

    /**
     * get fullname of customer
     * @return {String}
     */
    getFullName() {
        return this.fullname;
    }

    /**
     * set fullname of customer
     * @param {String} fullname
     */
    setFullName(fullname) {
        this.fullname = fullname;
    }

    /**
     * get birthday of customer
     * @return {Date}
     */
    getBirthday() {
        return this.birthday;
    }

    /**
     * set birthday of customer
     * @param {Date} birthday
     */
    setBirthday(birthday) {
        this.birthday = birthday;
    }

    /**
     * get active
     * @return {Number}
     */
    getActive() {
        return this.active;
    }

    /**
     * set updateAt
     * @param {Number} active
     */
    setActive(active) {
        this.active = active;
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

module.exports = Customer;