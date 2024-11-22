"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bill = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("../dbConnection");
const patient_schema_1 = require("./patient.schema");
class Bill extends sequelize_1.Model {
}
exports.Bill = Bill;
Bill.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: sequelize_1.DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [1, 45]
        }
    },
    patient_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'patients',
            key: 'id'
        },
    },
    createdBy: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: 'users',
            key: 'id'
        },
        onDelete: "SET NULL"
    },
}, {
    sequelize: dbConnection_1.sequelize,
    modelName: "Bill",
    paranoid: true,
    timestamps: true
});
// relationships 
patient_schema_1.Patient.hasMany(Bill);
Bill.belongsTo(patient_schema_1.Patient);
