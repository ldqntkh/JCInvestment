'use strict';
var userObj = require('../models/User');
const logFile = require('../globalFunctions');
const moment = require('moment');
const globalFunc = require('../globalFunctions');

class UserManager {
    constructor(dbConnect) {
        this.dbConnect = dbConnect;
    }

    /**
     * get all users
     * @return {List}
     */
    async getAllUser() {
        try {
            var result = await this.dbConnect.Doquery("select * from user", {});
            if (result !== null && result.length > 0) {
                return result;
            } else return null;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('getAllUser', __filename, 41, err);
            return null;
        }
    }

    /**
     * get object user
     * @param {Number} userId 
     * @return {Object} user
     */
    async getUserById(userId) {
        try {
            var result = await this.dbConnect.Doquery("select * from user where userid = :userId", {"userId" : userId});
            if (result !== null && result.length > 0) {
                return new userObj(result[0]);
            } else return null;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('getUserById', __filename, 59, err);
            return null;
        }
    }

    /**
     * get user by email
     * @param {String} email 
     * @return {Object} user 
     */
    async getUserByEmail(email) {
        try {
            var result = await this.dbConnect.Doquery("select * from user where email = :email",
                                                        {"email" : email});
            if (result !== null && result.length > 0) {
                var user = new userObj(result[0]);
                return user;
            } else return null;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('getUserByEmail', __filename, 79, err);
            return null;
        }
    }

    /**
     * get user by phone
     * @param {String} phone 
     * @return {Object} user 
     */
    async getUserByPhone(phone) {
        try {
            var result = await this.dbConnect.Doquery("select * from user where phone = :phone",
                                                        {"phone" : phone});
            if (result !== null && result.length > 0) {
                var user = new userObj(result[0]);
                return user;
            } else return null;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('getUserByPhone', __filename, 99, err);
            return null;
        }
    }

    /**
     * get object user by email and password
     * @param {String} email
     * @param {String} password 
     * @return {Object} user
     */
    async getUserByEmailAndPassword(email, password) {
        try {
            var result = await this.dbConnect.Doquery("select * from user where email = :email", {"email" : email});
            if (result !== null && result.length > 0) {
                var user = new userObj(result[0]);
                if (globalFunc.encrypt(password) == user.getPassword())
                    return user;
                else return null
            } else return null;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('getUserByEmailAndPassword', __filename, 121, err);
            return null;
        }
    }

     /**
     * get user by token
     * @param {String} token 
     * @param {String} email
     * @return {Number} affectedRows 
     */
    async getUserByEmailAndToken(token, email) {
        try {
            var result = await this.dbConnect.Doquery("select * from user where email = :email and token = :token",
                                                        {"token" : token, "email": email});
            if (result !== null && result.length > 0) {
                return new userObj(result[0]);
            } else return null;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('getUserByToken', __filename, 109, err);
            return null;
        }
    }

    /**
     * add new user
     * @param {Object} user 
     * @return {Number} affectedRows
     */
    async addNewUser(user) {
        try {
            user.setPassword(globalFunc.encrypt(user.getPassword()));
            let result = null;
            result = await this.dbConnect.ExcuteInsert("insert into user(email, password, fullname, phone, level) " +
                                                            "values(:email, :password, :fullname, :phone, :level)", user);
            return (result !== null) ? {affectedRows: result.affectedRows, userid: result.insertId} : null;
        } catch(err) {
            //console.log(err);
            logFile.writeLogFile('addNewUser', __filename, 139, err);
            return -1;
        }
    }

    /**
     * Update date data user
     * @param {Object} user 
     * @return {Number}
     */
    async updateUser(user) {
        try {
            user.setLastUpdate(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            // check password trước khi update
            var result = await this.dbConnect.ExcuteUpdate( `update user set email = :email, fullname = :fullname, phone = :phone
                                                            , level = :level, active = :active, token = :token, lastupdate = :lastUpdate where userid = :userid`, user);
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('updateUser', __filename, 157, err);
            return -1;
        }
    }

    /**
     * Update password user
     * @param {Object} user 
     * @return {Number}
     */
    async updateUserPassword(user) {
        try {
            user.setPassword(globalFunc.encrypt(user.getPassword()));
            user.setLastUpdate(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            user.setToken('');
            var result = await this.dbConnect.ExcuteUpdate( `update user set password = :password, token = :token, lastupdate = :lastUpdate where userid = :userid`, user);
            return result.affectedRows;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('updateUserPassword', __filename, 174, err);
            return -1;
        }
    }

    /**
     * delete user by id
     * @param {Number} userId 
     */
    async deleteUserById(userId) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from user where userid = :userid', {"userid" : userid});
            return userId;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('deleteUserById', __filename, 172, err);
            return -1;
        }
    }

    /**
     * delete user by email
     * @param {String} email 
     */
    async deleteUserByEmail(email) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from user where email = :email', {"email" : email});
            return userId;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('deleteUserByEmail', __filename, 187, err);
            return -1;
        }
    }

    /**
     * delete user by phone
     * @param {String} phone 
     */
    async deleteUserByPhone(phone) {
        try {
            var result = await this.dbConnect.ExcuteDelete('delete from user where phone = :phone', {"phone" : phone});
            return userId;
        } catch (err) {
            //console.log(err);
            logFile.writeLogFile('deleteUserByPhone', __filename, 202, err);
            return -1;
        }
    }
}

module.exports = UserManager;