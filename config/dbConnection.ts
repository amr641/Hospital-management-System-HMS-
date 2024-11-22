import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('hms', 'root',"" ,{
    host: process.env.IP_Address,
    dialect: 'mysql'
  });
  
  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connected...');
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });