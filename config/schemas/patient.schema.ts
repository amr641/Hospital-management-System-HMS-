import { sequelize } from "../dbConnection";
import { DataTypes, Model, Optional } from "sequelize";
interface patientCreationAttributes extends Optional<IPatient, "id"> { }
export class Patient extends Model<IPatient, patientCreationAttributes> implements IPatient {
    public id!: number;
    public name!: string;
    public email!: string;
    public phone_Number!: string;
    public gender!: string;
    public DOB!: Date;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;


}

Patient.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
    },

}, {
    sequelize,
    modelName: 'Patient',
    timestamps: true,
    paranoid: true,
    indexes: [{ fields: [' phone_Number'], unique: true }]

}
)

