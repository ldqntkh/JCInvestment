import crypto from '../package/crypto';
var algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';
    
const encrypt = (value) => {
    var cipher = crypto.createCipher(algorithm, password)
    var crypted = cipher.update(value, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

const decrypt = (value) => {
    var decipher = crypto.createDecipher(algorithm,password)
    var dec = decipher.update(value,'hex','utf8')
    dec += decipher.final('utf8');
    return dec;
}

export {
    encrypt,
    decrypt
}