import { Router } from 'express'
import db from '../db.js'

const router = Router()

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     summary: Lista todas las reservas realizadas
 *     responses:
 *       '200':
 *         description: Array de todas las reservas
 */
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM reservas')
        res.json(result.rows)
    } catch (error) {
        console.error('Error al obtener reservas:', error)
        res.status(500).json({ error: 'Error interno del servidor al obtener reservas.' })
    }
})

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     summary: Obtiene los detalles de una reserva específica
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Detalle de la reserva
 *       '404':
 *         description: Reserva no encontrada
 */
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const result = await db.query('SELECT * FROM reservas WHERE id = $1', [id])

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' })
        }

        res.json(result.rows[0])
    } catch (error) {
        console.error('Error al obtener detalle de reserva:', error)
        res.status(500).json({ error: 'Error interno del servidor al obtener detalle de reserva.' })
    }
})

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     summary: Crea una nueva reserva de sala (HU03)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - salaId
 *               - estudiante
 *               - fecha
 *               - hora
 *             properties:
 *               salaId:
 *                 type: integer
 *               estudiante:
 *                 type: string
 *               fecha:
 *                 type: string
 *               hora:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Reserva registrada exitosamente
 *       '400':
 *         description: Error en los datos o sala no disponible
 *       '404':
 *         description: Sala no encontrada
 */
router.post('/', async (req, res) => {
    try {
        const { salaId, estudiante, fecha, hora } = req.body

        if (!salaId || !estudiante || !fecha || !hora) {
            return res.status(400).json({ error: 'Faltan campos obligatorios' })
        }

        const salaResult = await db.query('SELECT * FROM salas WHERE id = $1', [salaId])
        if (salaResult.rows.length === 0) {
            return res.status(404).json({ error: 'La sala especificada no existe' })
        }

        const sala = salaResult.rows[0]
        if (sala.estado !== 'disponible') {
            return res
                .status(400)
                .json({ error: 'La sala no se encuentra disponible para reserva' })
        }

        const sql = `
            INSERT INTO reservas ("salaId", estudiante, fecha, hora)
            VALUES ($1, $2, $3, $4)
            RETURNING id
        `
        const insertResult = await db.query(sql, [Number(salaId), estudiante, fecha, hora])

        res.status(201).json({
            id: insertResult.rows[0].id,
            salaId: Number(salaId),
            estudiante,
            fecha,
            hora
        })
    } catch (error) {
        console.error('Error al crear reserva:', error)
        res.status(500).json({ error: 'Error interno del servidor al crear reserva.' })
    }
})

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     summary: Modifica los datos de una reserva existente
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
 *               salaId:
 *                 type: integer
 *               estudiante:
 *                 type: string
 *               fecha:
 *                 type: string
 *               hora:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Reserva actualizada exitosamente
 *       '400':
 *         description: Error en los datos enviados
 *       '404':
 *         description: Reserva o sala no encontrada
 */
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { salaId, estudiante, fecha, hora } = req.body

        const resExistente = await db.query('SELECT * FROM reservas WHERE id = $1', [id])
        if (resExistente.rows.length === 0) {
            return res.status(404).json({ error: 'Reserva no encontrada' })
        }
        const reservaExistente = resExistente.rows[0]

        const nuevaSalaId =
            salaId !== undefined ? Number(salaId) : reservaExistente.salaId
        const nuevoEstudiante =
            estudiante !== undefined ? estudiante : reservaExistente.estudiante
        const nuevaFecha = fecha !== undefined ? fecha : reservaExistente.fecha
        const nuevaHora = hora !== undefined ? hora : reservaExistente.hora

        if (salaId !== undefined) {
            const salaResult = await db.query('SELECT * FROM salas WHERE id = $1', [nuevaSalaId])
            if (salaResult.rows.length === 0) {
                return res
                    .status(404)
                    .json({ error: 'La nueva sala especificada no existe' })
            }
        }

        const sql = `
            UPDATE reservas
            SET "salaId" = $1, estudiante = $2, fecha = $3, hora = $4
            WHERE id = $5
        `
        await db.query(sql, [nuevaSalaId, nuevoEstudiante, nuevaFecha, nuevaHora, id])

        res.json({
            id: Number(id),
            salaId: nuevaSalaId,
            estudiante: nuevoEstudiante,
            fecha: nuevaFecha,
            hora: nuevaHora
        })
    } catch (error) {
        console.error('Error al actualizar reserva:', error)
        res.status(500).json({ error: 'Error interno del servidor al actualizar reserva.' })
    }
})

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     summary: Elimina o cancela una reserva existente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Reserva eliminada exitosamente
 *       '404':
 *         description: Reserva no encontrada
 */
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params

        const result = await db.query('DELETE FROM reservas WHERE id = $1', [id])

        if (result.rowCount === 0) {
            return res
                .status(404)
                .json({ error: 'Reserva no encontrada o ya eliminada' })
        }

        res.json({ mensaje: `Reserva con id ${id} eliminada correctamente` })
    } catch (error) {
        console.error('Error al eliminar reserva:', error)
        res.status(500).json({ error: 'Error interno del servidor al eliminar reserva.' })
    }
})

export default router
