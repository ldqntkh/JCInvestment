'use strict';

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

module.exports = {
    /**
     * encode string value
     * @param {String} value 
     * @return {String}
     */
    encrypt: (value) => {
        var cipher = crypto.createCipher(algorithm, password)
        var crypted = cipher.update(value, 'utf8', 'hex')
        crypted += cipher.final('hex');
        return crypted;
    },

    /**
     * decode string value
     * @param {String} value
     * @return {String} 
     */
    decrypt: (value) => {
        var decipher = crypto.createDecipher(algorithm,password)
        var dec = decipher.update(value,'hex','utf8')
        dec += decipher.final('utf8');
        return dec;
    },

    getUrl: (request, parameter) => {
        return request.protocol + '://' + request.headers.host + '/' + parameter;
    }
}
