import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";

export const Report = sequelize.define("Report", {
    result: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45]
        }
    },
    patient_id1: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Patient', 
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Appointment', 
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});
