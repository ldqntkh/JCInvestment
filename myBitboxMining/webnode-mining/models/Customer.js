'use strict';

class Customer {
    constructor(CustomerObject) {
        CustomerObject && Object.assign(this, CustomerObject)
        /**
         * email : String
         * password : String
         */
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

}

module.exports = Customer;