'use strict';
const LocaleModel = require('../models/Locale');
const SequelizeConfig = require('./SequelizeConfig');
const showMessage = require('../global/ResourceHelper').showMessage;
// require module
const moment = require('moment');

// import const
const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const LocaleTable = sequelize.define('locale', {
    name: Sequelize.STRING
});

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
