'use strict';

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

const moment = require('moment');

var FileHelper = {
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
        return request.protocol + '://' + request.get('host') + '/' + parameter;
    },

    crypto: (value) => {
        return crypto.createHmac('sha256', value)
        .digest('hex');
    },

    getEmailOptions: (to, subject, html) => {
        return {
            to: to,
            subject: subject,
            html: html
        }
    },
    /**
     * @param {Date} time
     * @param {Number} deadline hours to check time is over example: 1 hour, 2 hours
     * @return {Boolean}
     */
    isTimeout: (time, deadline) => {
        return moment(new Date(time)).diff(moment(Date.now()), 'hours') < deadline;
    },

    getRandomNumber: () => {
        return Math.floor(Math.random() * 899999 + 100000);
    }
}

module.exports = FileHelper;