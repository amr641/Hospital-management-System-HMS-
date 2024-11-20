"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Appointment = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
const appointment_ENUM_1 = require("../../src/modules/appointment/appointment.ENUM");
const patient_schema_1 = require("./patient.schema");
class Appointment extends sequelize_1.Model {
}
exports.Appointment = Appointment;
Appointment.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    department: {
        type: sequelize_1.DataTypes.STRING(30),
        allowNull: false,
    },
    staff_SSN: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isAfter: new Date().toISOString(),
        }
    },
    doctor_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id"
        }
    },
    room_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "rooms",
            key: "id"
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(appointment_ENUM_1.Status)),
        allowNull: false,
        defaultValue: appointment_ENUM_1.Status.Scheduled,
    }
}, {
    paranoid: true,
    sequelize: dbConnection_1.sequelize,
    modelName: 'Appointment',
    timestamps: true,
});
patient_schema_1.Patient.hasMany(Appointment, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    foreignKey: "patient_id" // Custom foreign key name
});
Appointment.belongsTo(patient_schema_1.Patient, {
    foreignKey: "patient_id" // Ensure both sides use the same foreign key
});
