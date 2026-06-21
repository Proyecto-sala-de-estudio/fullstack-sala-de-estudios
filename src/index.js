import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import salasRouter from './routes/salas.js'
import reservasRouter from './routes/reservas.js'
import cursosRouter from './routes/cursos.js'

const app = express()
app.use(express.json())

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({})
    }
    next()
})

const swaggerSpec = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Sala de Estudios',
            version: '1.0.0',
            description: 'API para gestionar salas de estudios'
        },
        servers: [
            { url: 'http://localhost:3000' },
            { url: 'https://backend-sala-de-estudios.onrender.com' }
        ]
    },
    apis: ['./src/routes/*.js']
})
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api/salas', salasRouter)
app.use('/api/reservas', reservasRouter)
app.use('/api/cursos', cursosRouter)

app.listen(3000, () => {
    console.log('API en http://localhost:3000')
    console.log('Documentación en http://localhost:3000/docs')
})
