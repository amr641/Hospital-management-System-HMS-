import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../dbConnection";
import { IRoom } from "../../src/modules/room/room.INTF";



interface RoomCreationAttributes extends Optional<IRoom, "id" | 'department'> { }


class Room extends Model<IRoom,RoomCreationAttributes> implements IRoom{
    public id!:number;
    public availability!:boolean;
     public capacity!: number;
    public department!: string;
    
       // Timestamps
       public readonly createdAt!: Date;
       public readonly updatedAt!: Date;


}

 Room.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
     availability: {
         type: DataTypes.TINYINT,
         allowNull: false,
         defaultValue: 1, // Assuming 1 for available, 0 for unavailable
         validate: {
             isIn: [[0, 1]] // Ensures availability is either 0 or 1
         }
     },
     capacity: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
             min: 1 // Ensures room capacity is at least 1
         }
     },
     department: {
         type: DataTypes.STRING(4),
         allowNull: false,
         validate: {
             len: [2, 4] // Ensures department code is between 2 and 4 characters
         }
     },
    
 },
{
    sequelize,
    modelName: 'Room',
    timestamps: true,
}
)
export default Room
