'use strict';
const ProductModel = require('../models/Product');
const PricebookModel = require('../models/Pricebook');
const SequelizeConfig = require('./SequelizeConfig');

// import const
const showMessage = require('../global/ResourceHelper').showMessage;

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const ProductTable = sequelize.define('product', {
    sku : Sequelize.STRING,
    hashrate : Sequelize.FLOAT,
    userUpdate : Sequelize.INTEGER,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

const LocaleTable = sequelize.define('locale', {
    name: Sequelize.STRING
});

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
    period : Sequelize.INTEGER,
    enable : Sequelize.BOOLEAN
});

module.exports = {

    /**
     * get list product enable
     * @param {Array} options only use in where condition
     * @return {Array} List of Product
     */
    getListProduct: async (options) => {
        let results = [];
        let whereOptions = options ? options : [];
        try {
            await ProductTable.hasMany(PricebookTable, {foreignKey: 'productId', targetKey: 'id'});
            
            let products = await ProductTable.findAll({
                where: whereOptions[0],
                include: [
                {
                    model: PricebookTable,
                    where: whereOptions[1],
                    require: false
                }]
            });
            if (products.length > 0) {
                for(let i = 0; i < products.length; i++) {
                    results.push(products[i].dataValues);
                }
            }
        } catch (err) {
            console.log(showMessage('ERROR_GETLISTPRODUCT') + err.message);
        }
        return results;
    },

    /**
     * get product object by product id
     * @param {Object} field example: {id: 1}
     */
    getProductById: async (field)=> {
        try {
            let product = await ProductTable.findOne({
                where: field
            });
            return product  && product.dataValues !== null ? new ProductModel(product.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_GETPRODUCTBYID') + err.message);
            return null;
        }
    },

    /**
     * add product object
     * @param {Object} field example: {id: 1}
     */
    addProduct: async (productObj) => {
        try {
            productObj.setCreateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            let product = await ProductTable.create(productObj, {raw: true, silent: true});
            return product  && product.dataValues !== null ? new ProductModel(product.dataValues) : null;
        } catch(err) {
            console.log(showMessage('ERROR_CREATEPRODUCT') + err.message);
            return null;
        }
    }
}