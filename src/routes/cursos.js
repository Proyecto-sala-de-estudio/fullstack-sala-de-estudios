import { Router } from 'express'
import { getCursos, crearCurso } from '../controllers/cursosController.js'

const router = Router()

/**
 * @swagger
 * /api/cursos:
 *   get:
 *     summary: Lista todos los cursos disponibles
 *     responses:
 *       '200':
 *         description: Array de todos los cursos
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/', getCursos)

/**
 * @swagger
 * /api/cursos:
 *   post:
 *     summary: Registra un nuevo curso en el catálogo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - instructor
 *               - creditos
 *             properties:
 *               nombre:
 *                 type: string
 *               instructor:
 *                 type: string
 *               creditos:
 *                 type: integer
 *     responses:
 *       '201':
 *         description: Curso creado exitosamente
 *       '400':
 *         description: Datos de entrada inválidos o faltantes
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/', crearCurso)

export default router
