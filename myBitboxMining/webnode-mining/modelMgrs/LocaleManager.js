'use strict';
const LocaleModel = require('../models/Locale');

const LocaleTable = require('./TableDefine').LocaleTable;

module.exports = {
    /**
     * get list wallet of customer
     * @param {Object} field {customerid : 1}
     * @return {Object} List wallet
     */
    getListLocale: async () => {
        try {
            let results = [];
            let listLocale = await LocaleTable.findAll();
            if (listLocale.length > 0) {
                for(let i = 0; i < listLocale.length; i++) {
                    let locale = new LocaleModel(listLocale[i].dataValues);
                    results.push(locale);
                }
            }
            return results;
        } catch (err) {
            console.log(err.message);
            return null;
        }
    }
}
