import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbConnection";
import { IAppointment } from "../../src/interfaces/appointment.INTF";
import { Status } from "../../src/enums/appointment.ENUM";
import { Patient } from "./patient.schema";

interface AppointmentCreationAttributes extends Optional<IAppointment, "id"> { }
export class Appointment extends Model<IAppointment, AppointmentCreationAttributes> implements IAppointment {

    public id!: number;
    public department!: string;
    public date!: Date;
    public doctor_id!: number;
    public patient_id!: number;
    public staff_SSN!: number
    public room_id!: number;
    public status !: Status

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;

}

Appointment.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    department: {
        type: DataTypes.STRING(30),
        allowNull: false,
    },
    staff_SSN: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true,
            isAfter: new Date().toISOString(),
        }
    },
    doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "users",
            key: "id"
        }
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: { model: "patients", key: 'id' },
        onDelete: 'SET NULL',
    },
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "rooms",
            key: "id"
        }
    },
    status: {
        type: DataTypes.ENUM(...Object.values(Status)),
        allowNull: false,
        defaultValue: Status.Scheduled,
    }
}, {
    paranoid: true,
    sequelize,
    modelName: 'Appointment',
    timestamps: true,

})
Patient.hasMany(Appointment, {
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
    foreignKey: "patient_id" // Custom foreign key name
});

Appointment.belongsTo(Patient, {
    foreignKey: "patient_id" // Ensure both sides use the same foreign key
});