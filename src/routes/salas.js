import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /api/salas:
 *   get:
 *     summary: Lista y filtra las salas de estudio disponibles (HU01 y HU05)
 *     parameters:
 *       - in: query
 *         name: capacidad
 *         schema:
 *           type: integer
 *         description: Filtra salas con esta capacidad mínima o superior
 *       - in: query
 *         name: equipamiento
 *         schema:
 *           type: string
 *         description: Filtra por elementos en la sala (ej. Pizarra, Proyector)
 *       - in: query
 *         name: edificio
 *         schema:
 *           type: string
 *         description: Filtra salas por el edificio donde se encuentran
 *     responses:
 *       '200':
 *         description: Array de salas de estudio (filtradas si se aplican parámetros)
 */
router.get('/', async (req, res) => {
    try {
        const { capacidad, equipamiento, edificio } = req.query

        let sql = "SELECT * FROM salas WHERE estado = 'disponible'"
        const params = []
        let idx = 1

        if (capacidad) {
            sql += ` AND capacidad >= $${idx++}`
            params.push(Number(capacidad))
        }

        if (equipamiento) {
            sql += ` AND equipamiento LIKE $${idx++}`
            params.push(`%${equipamiento}%`)
        }

        if (edificio) {
            sql += ` AND edificio = $${idx++}`
            params.push(edificio)
        }

        const result = await db.query(sql, params)
        res.json(result.rows)
    } catch (error) {
        console.error('Error al obtener salas:', error)
        res.status(500).json({ error: 'Error interno del servidor al obtener salas.' })
    }
})

/**
 * @swagger
 * /api/salas/{id}:
 *   get:
 *     summary: Muestra la información detallada de una sala específica (HU01)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       '200':
 *         description: Detalle de la sala
 *       '404':
 *         description: Sala no encontrada
 */
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM salas WHERE id = $1', [req.params.id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Sala no encontrada' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error al obtener detalle de sala:', error)
        res.status(500).json({ error: 'Error interno del servidor al obtener detalle de sala.' })
    }
})

/**
 * @swagger
 * /api/salas:
 *   post:
 *     summary: Agrega una nueva sala de estudio
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - edificio
 *               - piso
 *               - capacidad
 *               - estado
 *             properties:
 *               nombre:
 *                 type: string
 *               edificio:
 *                 type: string
 *               piso:
 *                 type: string
 *               capacidad:
 *                 type: integer
 *               equipamiento:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Sala creada exitosamente
 *       '400':
 *         description: Error en los datos enviados
 */
router.post('/', async (req, res) => {
    try {
        const { nombre, edificio, piso, capacidad, equipamiento, estado } = req.body

        // Validación básica por si faltan campos obligatorios
        if (!nombre || !edificio || !piso || !capacidad || !estado) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' })
        }

        const sql = `
            INSERT INTO salas (nombre, edificio, piso, capacidad, equipamiento, estado)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const result = await db.query(sql, [nombre, edificio, piso, Number(capacidad), equipamiento, estado])

        res.status(201).json({
            id: result.rows[0].id,
            nombre,
            edificio,
            piso,
            capacidad: Number(capacidad),
            equipamiento,
            estado
        })
    } catch (error) {
        console.error('Error al crear sala:', error)
        res.status(500).json({ error: 'Error interno del servidor al crear sala.' })
    }
})

/**
 * @swagger
 * /api/salas/{id}:
 *   put:
 *     summary: Modifica los datos de una sala existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               edificio:
 *                 type: string
 *               piso:
 *                 type: string
 *               capacidad:
 *                 type: integer
 *               equipamiento:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Sala actualizada exitosamente
 *       '404':
 *         description: Sala no encontrada
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { nombre, edificio, piso, capacidad, equipamiento, estado } = req.body

        const resultExistente = await db.query('SELECT * FROM salas WHERE id = $1', [id])
        if (resultExistente.rows.length === 0) {
            return res.status(404).json({ error: 'Sala no encontrada' })
        }
        const salaExistente = resultExistente.rows[0]

        const nuevoNombre = nombre !== undefined ? nombre : salaExistente.nombre
        const nuevoEdificio =
            edificio !== undefined ? edificio : salaExistente.edificio
        const nuevoPiso = piso !== undefined ? piso : salaExistente.piso
        const nuevaCapacidad =
            capacidad !== undefined ? Number(capacidad) : salaExistente.capacidad
        const nuevoEquipamiento =
            equipamiento !== undefined ? equipamiento : salaExistente.equipamiento
        const nuevoEstado = estado !== undefined ? estado : salaExistente.estado

        const sql = `
            UPDATE salas 
            SET nombre = $1, edificio = $2, piso = $3, capacidad = $4, equipamiento = $5, estado = $6
            WHERE id = $7
        `

        await db.query(sql, [
            nuevoNombre,
            nuevoEdificio,
            nuevoPiso,
            nuevaCapacidad,
            nuevoEquipamiento,
            nuevoEstado,
            id
        ])

        res.json({
            id: Number(id),
            nombre: nuevoNombre,
            edificio: nuevoEdificio,
            piso: nuevoPiso,
            capacidad: nuevaCapacidad,
            equipamiento: nuevoEquipamiento,
            estado: nuevoEstado
        })
    } catch (error) {
        console.error('Error al actualizar sala:', error)
        res.status(500).json({ error: 'Error interno del servidor al actualizar sala.' })
    }
})

/**
 * @swagger
 * /api/salas/{id}:
 *   delete:
 *     summary: Elimina una sala de la base de datos
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Sala eliminada exitosamente
 *       '404':
 *         description: Sala no encontrada
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await db.query('DELETE FROM salas WHERE id = $1', [id])

        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({ error: 'Sala no encontrada o ya eliminada' })
        }

        res.json({ mensaje: `Sala con id ${id} eliminada correctamente` })
    } catch (error) {
        console.error('Error al eliminar sala:', error)
        res.status(500).json({ error: 'Error interno del servidor al eliminar sala.' })
    }
})

export default router
