'use strict';
const ProductModel = require('../models/Product');
const PricebookModel = require('../models/Pricebook');
const SequelizeConfig = require('./SequelizeConfig');

// import const
const showMessage = require('../global/ResourceHelper').showMessage;

const moment = require('moment');

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

// ignore column id
PricebookTable.removeAttribute('id');
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
     * get product object by product id
     * @param {Object} field example: {id: 1}
     */
    getProductByField: async (options)=> {
        try {
            let results = [];
            let whereOptions = options ? options : [];
            try {
                await ProductTable.hasMany(PricebookTable, {foreignKey: 'productId', targetKey: 'id'});
                
                let product = await ProductTable.findOne({
                    where: whereOptions[0],
                    include: [
                    {
                        model: PricebookTable,
                        where: whereOptions[1],
                        require: false
                    }]
                });

                if (product !== null) {
                    results = new ProductModel(product.dataValues);
                }
            } catch (err) {
                console.log(showMessage('ERROR_GETLISTPRODUCT') + err.message);
            }
            return results;
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
    },

    /**
     * update product object
     * @param {Object} field example: {id: 1}
     */
    updateProduct: async (productObj) => {
        try {
            productObj.setUpdateAt(moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'));
            let affectedRows =  await ProductTable.update(productObj, {
                where: {id: productObj.getId()}
            });
            if (affectedRows.length > 0) {
                affectedRows = await PricebookTable.update(productObj, {
                    where: {
                        productId: productObj.getId(),
                        localeId: productObj.localeId
                    }
                });
            }
            return affectedRows.length > 0 ? affectedRows[0] : -1;
        } catch(err) {
            console.log(showMessage('ERROR_UPDATE_PRODUCT') + err.message);
            return null;
        }
    }
}