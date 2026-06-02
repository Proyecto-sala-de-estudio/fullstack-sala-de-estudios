import { Router } from 'express'
import db from '../../db.js'

const router = Router()
/**
 * @swagger
 * /api/salas:
 * get:
 * summary: Lista y filtra las salas de estudio disponibles (HU01 y HU05)
 * parameters:
 * - in: query
 * name: capacidad
 * schema: { type: integer }
 * description: Filtra salas con esta capacidad mínima o superior
 * - in: query
 * name: equipamiento
 * schema: { type: string }
 * description: Filtra por elementos en la sala (ej. Pizarra, Proyector)
 * - in: query
 * name: edificio
 * schema: { type: string }
 * description: Filtra salas por el edificio donde se encuentran
 * responses:
 * 200:
 * description: Array de salas de estudio (filtradas si se aplican parámetros)
 */
router.get('/', (req, res) => {
    // 1. Capturamos los parámetros de búsqueda de la URL (HU05)
    const { capacidad, equipamiento, edificio } = req.query

    // 2. Consulta base (Solo salas disponibles)
    let sql = 'SELECT * FROM salas WHERE estado = "disponible"'
    const params = []

    // 3. Aplicamos filtros dinámicamente según los criterios de aceptación
    if (capacidad) {
        sql += ' AND capacidad >= ?'
        params.push(Number(capacidad))
    }

    if (equipamiento) {
        sql += ' AND equipamiento LIKE ?'
        params.push(`%${equipamiento}%`) // LIKE permite buscar palabras dentro del texto
    }

    if (edificio) {
        sql += ' AND edificio = ?'
        params.push(edificio)
    }

    // 4. Ejecutamos la consulta con todos los filtros acumulados
    const salas = db.prepare(sql).all(...params)
    
    res.json(salas)
})
/**
 * @swagger
 * /api/salas/{id}:
 * get:
 * summary: Muestra la información detallada de una sala específica (HU01)
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema: { type: integer }
 * responses:
 * 200:
 * description: Detalle de la sala
 * 404:
 * description: Sala no encontrada
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

export default router