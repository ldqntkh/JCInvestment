'use strict';
const Sequelize = require('sequelize');

module.exports = {
    sequelize: () => {
        return new Sequelize('db_mybitboxmining', 'root', '', {
            host: 'localhost',
            dialect: 'mysql',
            pool: {
              max: 5,
              min: 0,
              acquire: 30000
            },
            define: {
                timestamps: false
            }
        });
    },
    isAuthenticated: () => {
        return this.sequelize().authenticated();
    }
}