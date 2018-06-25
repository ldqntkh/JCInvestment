'use strict';

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

/**
 * encode string value
 * @param {String} value 
 * @return {String}
 */
module.exports.encrypt = (value) => {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(value, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

/**
 * decode string value
 * @param {String} value
 * @return {String} 
 */
module.exports.decrypt = (value) => {
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(value,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}
