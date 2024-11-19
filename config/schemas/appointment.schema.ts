import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbConnection";
import { IAppointment } from "../../src/modules/appointment/appointment.INTF";

interface AppointmentCreationAttributes extends Optional<IAppointment, "id"> { }
class Appointment extends Model<IAppointment, AppointmentCreationAttributes> implements IAppointment {
    public id!: number;
    public department!: string;
    public date!: Date;
    public Doctor_id!: number;
    public patient_id!: number;
    public staff_id!: number
    public room_id!: number;

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
    date: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: true, 
            isAfter: new Date().toISOString(), 
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
    room_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "rooms",
            key: "id"
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}, {
    paranoid: true,
    sequelize,
    modelName: 'Appointment',
    timestamps: true,

}) 
