import pkg from 'pg'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const { Pool } = pkg

const pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'sala_estudios'
})

// Inicialización de la base de datos con reintentos y tolerancia a fallos en el arranque
const initDb = async (retries = 10, delay = 2000) => {
    while (retries > 0) {
        try {
            // Verificar conectividad básica primero
            await pool.query('SELECT 1')

            // Crear el esquema si la conexión es exitosa
            await pool.query(`
                CREATE TABLE IF NOT EXISTS salas (
                    id SERIAL PRIMARY KEY,
                    nombre TEXT NOT NULL,
                    edificio TEXT NOT NULL,
                    piso TEXT NOT NULL,
                    capacidad INTEGER NOT NULL,
                    equipamiento TEXT,
                    estado TEXT NOT NULL
                );

                CREATE TABLE IF NOT EXISTS reservas (
                    id SERIAL PRIMARY KEY,
                    "salaId" INTEGER NOT NULL,
                    estudiante TEXT NOT NULL,
                    fecha TEXT NOT NULL,
                    hora TEXT NOT NULL,
                    CONSTRAINT fk_sala FOREIGN KEY ("salaId") REFERENCES salas(id) ON DELETE CASCADE
                );
            `)
            console.log('Tablas inicializadas correctamente en PostgreSQL.')
            return
        } catch (error) {
            retries--
            console.warn(`[Base de Datos] No se pudo conectar a PostgreSQL (${error.message}). Reintentando en ${delay / 1000}s... Intentos restantes: ${retries}`)
            if (retries === 0) {
                console.error('[Base de Datos] Error crítico: No se pudo establecer conexión con PostgreSQL después de varios intentos.')
                process.exit(1)
            }
            await new Promise((resolve) => setTimeout(resolve, delay))
        }
    }
}

// Ejecutar inicialización
initDb()

export default pool
