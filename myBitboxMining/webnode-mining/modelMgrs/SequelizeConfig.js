'use strict';
const Sequelize = require('sequelize');

module.exports = {
    init: () => {
        return new Sequelize('db_mybitboxmining', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
            operatorsAliases: false,
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