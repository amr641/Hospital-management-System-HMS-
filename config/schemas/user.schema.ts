
import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbConnection";
import { Roles}from "../../src/modules/users/Roles.ENUMS";
import { IUser } from "../../src/modules/users/user.INTF";



interface UserCreationAttributes extends Optional<IUser, 'id' | 'department'> { }

// Define the User model class
class User extends Model<IUser, UserCreationAttributes> implements IUser {
    public id!: number;
    public name!: string;
    public SSN!: number;
    public password!: string;
    public email!: string;
    public department!: string;
    public role!: Roles;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;
}



User.init(
    {
       
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [2, 100],
            },
        },
        SSN: {
            type: DataTypes.INTEGER,
            unique: true,
            allowNull: false,
            validate: {
                isInt: true,
            },
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
            validate: {
                len: [8, 255],
            },
        },
        email: {
            type: DataTypes.STRING(45),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "invalid email format",
                },
            },
        },
        department: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: "no department",
        },
        role: {
            type: DataTypes.ENUM(...Object.values(Roles)),
            allowNull: false,
            defaultValue: Roles.STAFF,

        },
    },
    {
        sequelize,
        modelName: 'User',
        timestamps: true,
        paranoid: true,
        indexes: [{ fields: ['SSN'], unique: true }],
    }
);

export default User;