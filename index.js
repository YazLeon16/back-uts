const express = require('express')
const mongoose = require('mongoose')
const bodyparser = require('body-parser')
require('dotenv').config()

const app = express()

//capturar el body
app.use(bodyparser.urlencoded({
    extended: false
}))
app.use(bodyparser.json())

//conexion a la base de datos
const url = `mongodb+srv://layaz:milanesa210622@cluster0.qyubckm.mongodb.net/test`
    mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log('Conectado a la base de datos!!!'))
    .catch((error) => console.log('Error: '+ error))

//creación e importacion de rutas
const authRoutes = require('./routes/auth')

//ruta de middleware
app.use('/api/user',authRoutes)

//ruta raiz
app.get('/',(req, res) => {
    res.json({
        estado: true,
        mensaje: 'Si funciona... vamos a correr!!!'
    })
})
//arrancar servidor

const PORT = process.env.PORT || 9000
app.listen(PORT, () => {
    console.log(`Escuchando en el puerto: ${PORT}`)
})