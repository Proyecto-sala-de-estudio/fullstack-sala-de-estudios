import express from 'express'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const app = express()
app.use(express.json())

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

// ejemplo de ruta:
// app.use('api/usuarios', usuariosRouter)

app.listen(3000, () => {
    console.log('API en http://localhost:3000')
    console.log('Documentación en http://localhost:3000/docs')
})
