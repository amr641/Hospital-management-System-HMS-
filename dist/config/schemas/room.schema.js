"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
class Room extends sequelize_1.Model {
}
Room.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
        defaultValue: "no department"
    },
}, {
    paranoid: true,
    sequelize: dbConnection_1.sequelize,
    modelName: 'Room',
    timestamps: true,
});
exports.default = Room;
