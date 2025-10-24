import express from 'express'
import  pool  from './config/db.js'

const app = express()


//ruta test
app.get('/', (req, res) => {
    res.json({
        message: 'Hola Mundo!'
    })
})

const port = 3000
app.listen(port, () => {
    console.log(`Server On: http://localhost:${port}`)
})