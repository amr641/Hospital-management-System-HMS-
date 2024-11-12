"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Patient = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
exports.Patient = dbConnection_1.sequelize.define("Patient", {
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100],
        }
    },
    DOB: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toISOString().split("T")[0], // Ensures DOB is not in the future
        }
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM("male", "female"),
        allowNull: false,
    },
    phone_Number: {
        type: sequelize_1.DataTypes.STRING(11), // Allows handling leading zeros
        allowNull: false,
        unique: true, // Ensures uniqueness
        validate: {
            len: [10, 11], // Assuming it could be 10 or 11 characters long
            isNumeric: true, // Ensures only numeric values
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true, // Ensures valid email format
        }
    }
});
