'use strict';

class Token {
    constructor(TokenObject) {
        TokenObject && Object.assign(this, TokenObject)
        /**
         * email : String
         * name : String
         * createAt: Date
         * updateAt: Date
         */
    }

    /**
     * get email of token
     * @return {String} email
     */
    getEmail() {
        return this.email
    }

    /**
     * set email for token
     * @param {String} email 
     */
    setEmail(email) {
        this.email = email;
    }

    /**
     * get name of token
     * @return {String} name
     */
    getName() {
        return this.name
    }

    /**
     * set name for token
     * @param {String} name 
     */
    setName(name) {
        this.name = name;
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

module.exports = Token;