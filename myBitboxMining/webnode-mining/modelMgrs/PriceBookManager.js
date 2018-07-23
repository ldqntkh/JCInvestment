'use strict';
const PricebookModel = require('../models/Pricebook');
const SequelizeConfig = require('./SequelizeConfig');

// import const
const showMessage = require('../global/ResourceHelper').showAdminMessage;

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const PricebookTable = sequelize.define('pricebook', {
    productId: Sequelize.INTEGER,
    localeId: Sequelize.STRING,
    name : Sequelize.STRING,
    price : Sequelize.FLOAT,
    sale_price : Sequelize.FLOAT,
    currency : Sequelize.STRING,
    symbol_currency : Sequelize.STRING,
    desc1 : Sequelize.STRING,
    desc2 : Sequelize.STRING,
    desc3 : Sequelize.STRING,
    enable : Sequelize.BOOLEAN
});

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
            console.log(result);
            return result  && result.dataValues !== null ? new PricebookModel(result.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_CREATE_PRICEBOOK') + err.message);
            return null;
        }
    }
}