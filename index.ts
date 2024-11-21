import express from 'express'
import { sequelize } from './config/dbConnection'
import { bootstrab } from './src/modules/bootstrab'
const app = express()
const port = process.env.PORT || 3000
sequelize.sync({alter:true})
bootstrab(app)
app.listen(port, () => console.log(`server listening on port ${port}!`))