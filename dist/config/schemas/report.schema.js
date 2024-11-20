"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Report = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
const patient_schema_1 = require("./patient.schema");
const appointment_schema_1 = require("./appointment.schema");
class Report extends sequelize_1.Model {
}
exports.Report = Report;
Report.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    result: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45]
        }
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: patient_schema_1.Patient, key: 'id' },
        onDelete: 'SET NULL',
    },
    appointment_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: appointment_schema_1.Appointment, key: 'id' },
        onDelete: 'SET NULL',
    }
}, {
    sequelize: dbConnection_1.sequelize,
    modelName: "Report",
    paranoid: true,
    timestamps: true
});
patient_schema_1.Patient.hasMany(Report, { foreignKey: 'patient_id', onDelete: 'SET NULL' });
Report.belongsTo(patient_schema_1.Patient, { foreignKey: 'patient_id', onDelete: 'SET NULL' });
appointment_schema_1.Appointment.hasMany(Report, { foreignKey: 'appointment_id', onDelete: 'SET NULL' });
Report.belongsTo(appointment_schema_1.Appointment, { foreignKey: 'appointment_id', onDelete: 'SET NULL' });
