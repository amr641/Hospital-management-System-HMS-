
import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";
import { Roles } from "../../src/modules/users/Roles.ENUMS";

export const User = sequelize.define("User", {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100],
        }
    },
    SSN: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false,
        validate: {
            isInt: true,
        }
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            len: [8, 255]
        }
    },
    email: {
        type: DataTypes.STRING(45),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: "invalid email format"
            }
        }
    },
    department: {
        type: DataTypes.STRING(100),
        allowNull: true,
        defaultValue: "no department"
    },
    role: {
        type: DataTypes.ENUM(...Object.values(Roles)),
        allowNull: false,
        defaultValue: Roles.STAFF,
    }
}, {
    omitNull: true,
    timestamps: true, // Adds createdAt and updatedAt fields
    paranoid: true, // Enables soft 
    indexes: [
        { fields: ['SSN'], unique: true },
    ]
});