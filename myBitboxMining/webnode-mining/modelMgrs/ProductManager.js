'use strict';
const ProductModel = require('../models/Product');
const SequelizeConfig = require('./SequelizeConfig');

const Sequelize = SequelizeConfig.getSequelizeModule();

const sequelize = SequelizeConfig.init();

const ProductTable = sequelize.define('product', {
    name : Sequelize.STRING,
    hashrate : Sequelize.FLOAT,
    price : Sequelize.FLOAT,
    sale_price : Sequelize.FLOAT,
    currency : Sequelize.STRING,
    desc1 : Sequelize.STRING,
    desc2 : Sequelize.STRING,
    desc3 : Sequelize.STRING,
    period : Sequelize.INTEGER,
    enable : Sequelize.BOOLEAN,
    userUpdate : Sequelize.INTEGER,
    createAt : Sequelize.DATE,
    updateAt : Sequelize.DATE
});

// class helper
const FileHelper = require('../private/js/FileHelper');

module.exports = {

    /**
     * get list product enable
     * @param {Object} field example: {enable: 1}
     * @return {Object} List<ProductModel>
     */
    getListProduct: async (field) => {
        let results = [];
        try {
            let products = await ProductTable.findAll({
                where : field
            });
            if (products.length > 0) {
                for(let i = 0; i < products.length; i++) {
                    let productModel = new ProductModel(products[i].dataValues);
                    results.push(productModel);
                }
            }
        } catch (err) {
            console.log('error while get list product: ' + err.message);
        }
        return results;
    }
}