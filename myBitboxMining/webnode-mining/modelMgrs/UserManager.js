'use strict';
var userObj = require('../models/User');

class UserManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get object user by username and password
     * @param {String} username
     * @param {String} password 
     * @return {Object} user
     */
    async getUserByUsernamelAndPassword(username, password) {
        try {
            var result = await this.dbConnect.Doquery("select * from user where username = :username and password = :password", {"username" : username, "password": password});
            return result !== null && result.length > 0 ? new userObj(result[0]) : null;
        } catch(err) {
            //console.log(err);
            return null;
        }
    }
}

module.exports = UserManager;