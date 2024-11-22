import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbConnection";
import { IBill } from "../../src/modules/bill/bill.INTF";
import { Patient } from "./patient.schema";



interface BillCreationAttributes extends Optional<IBill, "id"> { }
export class Bill extends Model<IBill, BillCreationAttributes> implements IBill {
    public id!: number;
    public amount!: string;
    public patient_id!: number;
    public createdBy!: number;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date | null;

}

Bill.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45]
        }
    },
    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id'
        },
    },

    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: "SET NULL"
    },

}, {
    sequelize,
    modelName: "Bill",
    paranoid: true,
    timestamps: true
})
// relationships 
Patient.hasMany(Bill,{
    foreignKey:"patient_id"
})
Bill.belongsTo(Patient,{
    foreignKey:"patient_id"
})


