import { DataTypes } from "sequelize";
import { sequelize } from "../dbConnection";

export const Inventory = sequelize.define("Inventory", {
    item_name: {
        type: DataTypes.STRING(4),
        allowNull: false,
        validate: {
            len: [2, 20], // Ensures item_name is between 2 and 4 characters
        }
    },
    category: {
        type: DataTypes.STRING(45),
        allowNull: false,
        validate: {
            len: [2, 45], // Ensures category is between 2 and 45 characters
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 0, // Ensures quantity cannot be negative
        }
    },
    Supplier_SSN: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    handled_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User', // Assumes 'Staff' table exists
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
});
