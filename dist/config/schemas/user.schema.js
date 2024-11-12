"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
const Roles_ENUMS_1 = require("../../src/modules/users/Roles.ENUMS");
// Define the User model class
class User extends sequelize_1.Model {
}
User.init({
    name: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100],
        },
    },
    SSN: {
        type: sequelize_1.DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [8, 255],
        },
    },
    email: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "invalid email format",
            },
        },
    },
    department: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "no department",
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(Roles_ENUMS_1.Roles)),
        allowNull: false,
        defaultValue: Roles_ENUMS_1.Roles.STAFF,
    },
}, {
    sequelize: dbConnection_1.sequelize,
    modelName: 'User',
    timestamps: true,
    paranoid: true,
    indexes: [{ fields: ['SSN'], unique: true }],
});
exports.default = User;
