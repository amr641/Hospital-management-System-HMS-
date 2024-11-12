import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";

const Appointment = sequelize.define("Appointment", {
    department: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
        }
    },
    Doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'User',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Patient',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    staff_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "Room",
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});