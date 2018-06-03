const fs = require('fs');
const moment = require('moment');

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

/**
 * 
 * @param {String} func 
 * @param {String} filename 
 * @param {Number} line 
 * @param {Object} log 
 */
module.exports.writeLogFile = function(func, filename, line, log) {
    let result = {
        date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        filename: filename,
        func: func,
        line: line,
        logMessage: log
    }
    fs.appendFile("./tmp/log.txt", JSON.stringify(result) + ',', function(err) {
        if(err) {
            return console.log(err);
        }
    }); 
}

module.exports.readLogFile = async function() {
    try {
        let results = await fs.readFileSync("./tmp/log.txt", 'utf8');
        return results;
    } catch (err) {
        console.log(err);
        return '';
    }
}
