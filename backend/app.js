import express from 'express'

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