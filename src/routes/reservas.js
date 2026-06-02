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
router.get('/', (req, res) => {
    const reservas = db.prepare('SELECT * FROM reservas').all()
    res.json(reservas)
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
router.get('/:id', (req, res) => {
    const { id } = req.params
    const reserva = db.prepare('SELECT * FROM reservas WHERE id = ?').get(id)

    if (!reserva) {
        return res.status(404).json({ error: 'Reserva no encontrada' })
    }

    res.json(reserva)
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
router.post('/', (req, res) => {
    const { salaId, estudiante, fecha, hora } = req.body

    if (!salaId || !estudiante || !fecha || !hora) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const sala = db.prepare('SELECT * FROM salas WHERE id = ?').get(salaId)
    if (!sala) {
        return res.status(404).json({ error: 'La sala especificada no existe' })
    }

    if (sala.estado !== 'disponible') {
        return res
            .status(400)
            .json({ error: 'La sala no se encuentra disponible para reserva' })
    }

    const sql = `
        INSERT INTO reservas (salaId, estudiante, fecha, hora)
        VALUES (?, ?, ?, ?)
    `
    const info = db.prepare(sql).run(Number(salaId), estudiante, fecha, hora)

    res.status(201).json({
        id: info.lastInsertRowid,
        salaId,
        estudiante,
        fecha,
        hora
    })
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
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { salaId, estudiante, fecha, hora } = req.body

    const reservaExistente = db
        .prepare('SELECT * FROM reservas WHERE id = ?')
        .get(id)
    if (!reservaExistente) {
        return res.status(404).json({ error: 'Reserva no encontrada' })
    }

    const nuevaSalaId =
        salaId !== undefined ? Number(salaId) : reservaExistente.salaId
    const nuevoEstudiante =
        estudiante !== undefined ? estudiante : reservaExistente.estudiante
    const nuevaFecha = fecha !== undefined ? fecha : reservaExistente.fecha
    const nuevaHora = hora !== undefined ? hora : reservaExistente.hora

    if (salaId !== undefined) {
        const sala = db
            .prepare('SELECT * FROM salas WHERE id = ?')
            .get(nuevaSalaId)
        if (!sala) {
            return res
                .status(404)
                .json({ error: 'La nueva sala especificada no existe' })
        }
    }

    const sql = `
        UPDATE reservas
        SET salaId = ?, estudiante = ?, fecha = ?, hora = ?
        WHERE id = ?
    `
    db.prepare(sql).run(nuevaSalaId, nuevoEstudiante, nuevaFecha, nuevaHora, id)

    res.json({
        id: Number(id),
        salaId: nuevaSalaId,
        estudiante: nuevoEstudiante,
        fecha: nuevaFecha,
        hora: nuevaHora
    })
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
router.delete('/:id', (req, res) => {
    const { id } = req.params

    const info = db.prepare('DELETE FROM reservas WHERE id = ?').run(id)

    if (info.changes === 0) {
        return res
            .status(404)
            .json({ error: 'Reserva no encontrada o ya eliminada' })
    }

    res.json({ mensaje: `Reserva con id ${id} eliminada correctamente` })
})

export default router
