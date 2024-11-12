"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
exports.Report = dbConnection_1.sequelize.define("Report", {
    result: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45]
        }
    },
    patient_id1: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Patient',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    appointment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Appointment',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});
