import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";
export const Patient = sequelize.define("Patient", {
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [2, 100],
        }
    },
    DOB: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isBefore: new Date().toISOString().split("T")[0], // Ensures DOB is not in the future
        }
    },
    gender: {
        type: DataTypes.ENUM("male", "female"),
        allowNull: false,
    },
    phone_Number: {
        type: DataTypes.STRING(11), // Allows handling leading zeros
        allowNull: false,
        unique: true, // Ensures uniqueness
        validate: {
            len: [10, 11], // Assuming it could be 10 or 11 characters long
            isNumeric: true, // Ensures only numeric values
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {
            isEmail: true, // Ensures valid email format
        }
    }
});
