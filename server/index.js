require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorMiddleware = require('./middlewares/ErrorMiddleware')
const bcrypt = require('bcrypt')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorMiddleware)



const start = async ()=>{
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log(bcrypt.compareSync('admin', '$2b$05$HA2m.6HzjAwQOCjHcTaVSeygp5gfOjWvf4vnfq6qAQIjTO7U0ek9e'));
        app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console,console.log(e);
    }
}

start()