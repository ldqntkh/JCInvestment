'use strict';

class User {
    constructor(UserObject) {
        UserObject && Object.assign(this, UserObject)
        /**
         * username : String
         * password : String
         */
    }

    /**
     * get username of user
     * @return {String} username
     */
    getUsername() {
        return this.username
    }

    /**
     * set username for user
     * @param {String} username 
     */
    setEmail(username) {
        this.username = username;
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

}

module.exports = User;