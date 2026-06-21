import db from '../db.js'

/**
 * Obtiene todos los cursos de la base de datos.
 * @returns {Promise<Array>} Listado de cursos
 */
export const obtenerTodos = async () => {
    const res = await db.query('SELECT * FROM cursos')
    return res.rows
}

/**
 * Inserta un nuevo curso en la base de datos.
 * @param {Object} curso Datos del curso (nombre, instructor, creditos)
 * @returns {Promise<Object>} Curso creado con su ID generado
 */
export const crear = async (curso) => {
    const { nombre, instructor, creditos } = curso
    const sql = `
        INSERT INTO cursos (nombre, instructor, creditos)
        VALUES ($1, $2, $3)
        RETURNING id
    `
    const res = await db.query(sql, [nombre, instructor, Number(creditos)])
    return {
        id: res.rows[0].id,
        nombre,
        instructor,
        creditos: Number(creditos)
    }
}
