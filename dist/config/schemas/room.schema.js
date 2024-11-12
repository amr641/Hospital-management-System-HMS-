"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
exports.Room = dbConnection_1.sequelize.define("Room", {
    availability: {
        type: sequelize_1.DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 1, // Assuming 1 for available, 0 for unavailable
        validate: {
            isIn: [[0, 1]] // Ensures availability is either 0 or 1
        }
    },
    capacity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1 // Ensures room capacity is at least 1
        }
    },
    department: {
        type: sequelize_1.DataTypes.STRING(4),
        allowNull: false,
        validate: {
            len: [2, 4] // Ensures department code is between 2 and 4 characters
        }
    },
});
