import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";

export const Bill = sequelize.define("Bill", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45] // Ensures the length is within 1 to 45 characters
        }
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Patient', // Assumes there is a 'Patients' table
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});
