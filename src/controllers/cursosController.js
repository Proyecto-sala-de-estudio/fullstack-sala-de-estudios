import * as cursosService from '../services/cursosService.js'

/**
 * Controlador para obtener todos los cursos.
 */
export const getCursos = (req, res) => {
    try {
        const cursos = cursosService.obtenerTodos()
        res.json(cursos)
    } catch (error) {
        console.error('Error al obtener cursos:', error)
        res.status(500).json({ error: 'Error interno del servidor al obtener los cursos.' })
    }
}

/**
 * Controlador para registrar un nuevo curso.
 * Valida que nombre e instructor no estén vacíos y créditos sea un entero positivo mayor que cero.
 */
export const crearCurso = (req, res) => {
    try {
        const { nombre, instructor, creditos } = req.body

        // Validaciones en backend
        if (nombre === undefined || nombre === null || typeof nombre !== 'string' || nombre.trim() === '') {
            return res.status(400).json({ error: 'El campo "nombre" es obligatorio y no puede estar vacío.' })
        }

        if (instructor === undefined || instructor === null || typeof instructor !== 'string' || instructor.trim() === '') {
            return res.status(400).json({ error: 'El campo "instructor" es obligatorio y no puede estar vacío.' })
        }

        if (creditos === undefined || creditos === null || creditos === '') {
            return res.status(400).json({ error: 'El campo "créditos" es obligatorio y no puede estar vacío.' })
        }

        const creditosNum = Number(creditos)
        if (isNaN(creditosNum) || !Number.isInteger(creditosNum) || creditosNum <= 0) {
            return res.status(400).json({ error: 'El campo "créditos" debe ser un número entero positivo mayor que cero.' })
        }

        const nuevoCurso = cursosService.crear({
            nombre: nombre.trim(),
            instructor: instructor.trim(),
            creditos: creditosNum
        })

        res.status(201).json(nuevoCurso)
    } catch (error) {
        console.error('Error al crear curso:', error)
        res.status(500).json({ error: 'Error interno del servidor al registrar el curso.' })
    }
}
