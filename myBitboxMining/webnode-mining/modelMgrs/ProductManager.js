'use strict';
const ProductModel = require('../models/Product');
// import const
const showMessage = require('../global/ResourceHelper').showMessage;

const moment = require('moment');

const ProductTable = require('./TableDefine').ProductTable;
const PricebookTable = require('./TableDefine').PricebookTable;

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
                where: whereOptions.length > 0 ? whereOptions[0] : whereOptions,
                include: [
                {
                    model: PricebookTable,
                    where: whereOptions.length > 0 ? whereOptions[1] : whereOptions,
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
                where: {id: productObj.productId}
            });
            if (affectedRows.length > 0) {
                delete productObj.id;
                affectedRows = await PricebookTable.update(productObj, {
                    where: {
                        productId: productObj.productId,
                        localeId: productObj.localeId
                    }
                });
            }
            return affectedRows.length > 0 ? affectedRows[0] : -1;
        } catch(err) {
            console.log(showMessage('ERROR_UPDATE_PRODUCT') + err.message);
            return null;
        }
    },

    /**
     * delete product 
     * @param {Object} {id : id}
     * @return {Number} affectedRows
     */
    deleteProduct: async(whereOption) => {
        let affectedRows = -1;
        try {
            affectedRows = await ProductTable.destroy({
                where : whereOption
            });
        } catch (err) {
            console.log(err.message);
        }
        return affectedRows;
    }
}