'use strict';
const Sequelize = require('sequelize');

module.exports = {
    init: () => {
        return new Sequelize('db_mybitboxmining', 'admin', 'Admin@1234', {
            host: 'localhost',
            port: 9999,
            dialect: 'mysql',
            operatorsAliases: false,
            dialectOptions : {
                socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
                requestTimeout: 30000,
                encrypt: true
            },
            pool: {
                max: 5,
                min: 0,
                acquire: 30000
            },
            define: {
                freezeTableName: true,// avoid s is added in the end of text
                timestamps: false
            }
        });
    },
    isAuthenticated: () => {
        module.exports.init().authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    },
    getSequelizeModule: () => {
        return Sequelize;
    }
}