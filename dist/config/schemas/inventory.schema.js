"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
class Inventory extends sequelize_1.Model {
}
Inventory.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_name: {
        type: sequelize_1.DataTypes.STRING(4),
        allowNull: false,
        validate: {
            len: [2, 20], // Ensures item_name is between 2 and 4 characters
        },
    },
    category: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 50], // Ensures category is between 2 and 45 characters
        }
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    Supplier_SSN: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    handled_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    paranoid: true,
    sequelize: dbConnection_1.sequelize,
    modelName: 'Inventory',
    timestamps: true,
});
exports.default = Inventory;
