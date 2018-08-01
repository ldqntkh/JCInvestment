'use strict';
const PricebookModel = require('../models/Pricebook');
// import const
const showMessage = require('../global/ResourceHelper').showAdminMessage;

const PricebookTable = require('./TableDefine').PricebookTable;

module.exports = {
    /**
     * add pricebook
     * @param {Object} field example: {id: 1}
     */
    addPriceBook: async (pricebook) => {
        try {
            let result = await PricebookTable.create(pricebook, {raw: true, silent: true});
            return result  && result.dataValues !== null ? new PricebookModel(result.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_CREATE_PRICEBOOK') + err.message);
            return null;
        }
    },

    /**
     * get pricebook
     * @param {Object} field example: {id: 1}
     */
    getPriceBook: async (options) => {
        try {
            let result = await PricebookTable.findOne({
                where: options
            });
            return result  && result.dataValues !== null ? new PricebookModel(result.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_CREATE_PRICEBOOK') + err.message);
            return null;
        }
    }
}