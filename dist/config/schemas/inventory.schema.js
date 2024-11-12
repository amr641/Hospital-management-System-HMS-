"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
exports.Inventory = dbConnection_1.sequelize.define("Inventory", {
    item_name: {
        type: sequelize_1.DataTypes.STRING(4),
        allowNull: false,
        validate: {
            len: [2, 20], // Ensures item_name is between 2 and 4 characters
        }
    },
    category: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [2, 45], // Ensures category is between 2 and 45 characters
        }
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0, // Ensures quantity cannot be negative
        }
    },
    Supplier_SSN: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    handled_by: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', // Assumes 'Staff' table exists
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});
