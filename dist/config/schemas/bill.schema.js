"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bill = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
exports.Bill = dbConnection_1.sequelize.define("Bill", {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45] // Ensures the length is within 1 to 45 characters
        }
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Patient', // Assumes there is a 'Patients' table
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});
