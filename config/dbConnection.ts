import { Sequelize } from "sequelize";

export const sequelize = new Sequelize('hms', 'root',"" ,{
    host: '127.0.0.1',
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