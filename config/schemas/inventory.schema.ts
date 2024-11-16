import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbConnection";
import { IInventory } from "../../src/modules/inventory/inventory.INTF";
interface InventoryCreationAttributes extends Optional<IInventory, "id"> { }

class Inventory extends Model<IInventory, InventoryCreationAttributes> implements IInventory {
    public id!: number;
    public item_name!: string;
    public category!: string;
    public quantity!: number;
    public Supplier_SSN!: number;
    public handled_by!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date | null;


}

Inventory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    item_name: {
        type: DataTypes.STRING(4),
        allowNull: false,
        validate: {
            len: [2, 20], // Ensures item_name is between 2 and 4 characters
        },
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
    },
    Supplier_SSN: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: "no department"
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
    },

},
    {
        paranoid: true,
        sequelize,
        modelName: 'Inventory',
        timestamps: true,
    },

)
export default Inventory
