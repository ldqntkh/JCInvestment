'use strict';
const Sequelize = require('sequelize');

module.exports = {
    sequelize: () => {
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
    isAuthenticated: async () => {
        try {
            return await sequelize().authenticated();
        } catch(err) {
            console.log(err);
        }
        return false;
    }
}