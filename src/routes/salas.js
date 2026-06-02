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
router.get('/', (req, res) => {
    const { capacidad, equipamiento, edificio } = req.query

    let sql = 'SELECT * FROM salas WHERE estado = "disponible"'
    const params = []

    if (capacidad) {
        sql += ' AND capacidad >= ?'
        params.push(Number(capacidad))
    }

    if (equipamiento) {
        sql += ' AND equipamiento LIKE ?'
        params.push(`%${equipamiento}%`)
    }

    if (edificio) {
        sql += ' AND edificio = ?'
        params.push(edificio)
    }

    const salas = db.prepare(sql).all(...params)
    res.json(salas)
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
router.get('/:id', (req, res) => {
    const sala = db
        .prepare('SELECT * FROM salas WHERE id = ?')
        .get(req.params.id)

    if (!sala) {
        return res.status(404).json({ error: 'Sala no encontrada' })
    }

    res.json(sala)
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
router.post('/', (req, res) => {
    const { nombre, edificio, piso, capacidad, equipamiento, estado } = req.body

    // Validación básica por si faltan campos obligatorios
    if (!nombre || !edificio || !piso || !capacidad || !estado) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' })
    }

    const sql = `
        INSERT INTO salas (nombre, edificio, piso, capacidad, equipamiento, estado)
        VALUES (?, ?, ?, ?, ?, ?)
    `

    const info = db
        .prepare(sql)
        .run(nombre, edificio, piso, Number(capacidad), equipamiento, estado)

    res.status(201).json({
        id: info.lastInsertRowid,
        nombre,
        edificio,
        piso,
        capacidad,
        equipamiento,
        estado
    })
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
router.put('/:id', (req, res) => {
    const { id } = req.params
    const { nombre, edificio, piso, capacidad, equipamiento, estado } = req.body

    const salaExistente = db.prepare('SELECT * FROM salas WHERE id = ?').get(id)
    if (!salaExistente) {
        return res.status(404).json({ error: 'Sala no encontrada' })
    }

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
        SET nombre = ?, edificio = ?, piso = ?, capacidad = ?, equipamiento = ?, estado = ?
        WHERE id = ?
    `

    db.prepare(sql).run(
        nuevoNombre,
        nuevoEdificio,
        nuevoPiso,
        nuevaCapacidad,
        nuevoEquipamiento,
        nuevoEstado,
        id
    )

    res.json({
        id: Number(id),
        nombre: nuevoNombre,
        edificio: nuevoEdificio,
        piso: nuevoPiso,
        capacidad: nuevaCapacidad,
        equipamiento: nuevoEquipamiento,
        estado: nuevoEstado
    })
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
router.delete('/:id', (req, res) => {
    const { id } = req.params

    const info = db.prepare('DELETE FROM salas WHERE id = ?').run(id)

    if (info.changes === 0) {
        return res
            .status(404)
            .json({ error: 'Sala no encontrada o ya eliminada' })
    }

    res.json({ mensaje: `Sala con id ${id} eliminada correctamente` })
})

export default router
