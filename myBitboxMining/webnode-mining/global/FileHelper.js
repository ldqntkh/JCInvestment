'use strict';

const crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

const moment = require('moment');
const language = require('../const/variableLabel');
const languageAdmin = require('../const/admin/variableLabel');

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
        return request.protocol + '://' + request.headers.host + '/' + parameter;
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
    },

    showMessage: (id, args) => {
        let message = language.en[id];
        if (typeof args !== 'undefined' && args.length > 0) {
            return FileHelper.replaceContent(message, args);
        }
        return message;
    },

    showAdminMessage: (id, args) => {
        let message = languageAdmin.en[id];
        if (typeof args !== 'undefined' && args.length > 0) {
            return FileHelper.replaceContent(message, args);
        }
        return message;
    },

    replaceContent: (message, args) => {
        for(let i = 0; i < args.length; i++) {
            message = message.replace('{' + i + '}', args[i]);
        }
        return message;
    }
}

module.exports = FileHelper;