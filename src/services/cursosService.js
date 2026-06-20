import db from '../db.js'

/**
 * Obtiene todos los cursos de la base de datos.
 * @returns {Array} Listado de cursos
 */
export const obtenerTodos = () => {
    return db.prepare('SELECT * FROM cursos').all()
}

/**
 * Inserta un nuevo curso en la base de datos.
 * @param {Object} curso Datos del curso (nombre, instructor, creditos)
 * @returns {Object} Curso creado con su ID generado
 */
export const crear = (curso) => {
    const { nombre, instructor, creditos } = curso
    const sql = `
        INSERT INTO cursos (nombre, instructor, creditos)
        VALUES (?, ?, ?)
    `
    const info = db.prepare(sql).run(nombre, instructor, Number(creditos))
    return {
        id: info.lastInsertRowid,
        nombre,
        instructor,
        creditos: Number(creditos)
    }
}
