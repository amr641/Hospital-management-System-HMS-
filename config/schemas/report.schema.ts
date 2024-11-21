import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbConnection";
import { IReport } from "../../src/modules/report/report.INTF";
import { Patient } from "./patient.schema";
import { Appointment } from "./appointment.schema";


interface ReportCreationAttributes extends Optional<IReport, "id"> { }
export class Report extends Model<IReport, ReportCreationAttributes> implements IReport {

    public id!: number;
    public result!: string;
    public patient_id!: number;
    public appointment_id!: number;
    public createdBy!: number


    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}



Report.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    result: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45],
            notEmpty: true, 
        },
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: { model: "patients", key: 'id' },
        onDelete: 'SET NULL',
    },
    appointment_id: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: { model: "appointments", key: 'id' },
        onDelete: 'SET NULL',
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true, 
        references: { model: "users", key: 'id' },
        onDelete: 'SET NULL',
    },
}, {
    sequelize,
    modelName: "Report",
    paranoid: true,
    timestamps: true,
});

// Relationships
Patient.hasMany(Report, { foreignKey: 'patient_id', onDelete: 'SET NULL' });
Report.belongsTo(Patient, { foreignKey: 'patient_id', onDelete: 'SET NULL' });

Appointment.hasMany(Report, { foreignKey: 'appointment_id', onDelete: 'SET NULL' });
Report.belongsTo(Appointment, { foreignKey: 'appointment_id', onDelete: 'SET NULL' });
