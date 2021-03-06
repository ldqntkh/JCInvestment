'use strict';
const TokenModel = require('../models/Token');
// import const
const showMessage = require('../global/ResourceHelper').showMessage;

const TokenTable = require('./TableDefine').TokenTable;

// ignore column id
TokenTable.removeAttribute('id');


// require module
const moment = require('moment');

module.exports = {
    /**
     * get Token by field name/value
     * @param {Object} field example: {fieldName: valueOfField}
     * @return {Object} Token
     */
    getTokenByField: async (field) => {
        try {
            var token = await TokenTable.findOne({
                where: field
            });
            return token && token.dataValues !== null ? new TokenModel(token.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETTOKEN') + err.message);
            return null;
        }
    },
    /**
     * add new Token
     * @param {Object} Token 
     * @return {Object} TokenModel
     */
    addToken: async (TokenObj) => {
        try {
            TokenObj.setCreateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            // field updateAt will not be updated
            var token = await TokenTable.create(TokenObj, {raw: true, silent: true});
            return token && token.dataValues !== null ? new TokenModel(token.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERRRO_ADDTOKEN') + err.message);
            return null;
        }
    },
    /**
     * update Token
     * @param {Object} token
     * @return {Number} affectedRows
     */
    updateToken: async (token) => {
        try {
            token.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            var affectedRows =  await TokenTable.update(token, {
                                    where: {id: token.getId()}
                                });
            return affectedRows.length > 0 ? affectedRows[0] : -1;
        } catch(err) {
            console.log(err.message);
            return -1;
        }
    }
}
