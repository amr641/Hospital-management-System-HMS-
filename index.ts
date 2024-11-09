import express from 'express'
import {sequelize} from './config/dbConnection'
const app = express()
const port = process.env.PORT||3000

sequelize.sync()
app.listen(port, () => console.log(`Example app listening on port ${port}!`))