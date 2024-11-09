"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('hms', 'root', "", {
    host: '127.0.0.1',
    dialect: 'mysql'
});
exports.sequelize
    .authenticate()
    .then(() => {
    console.log('Database connected...');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
