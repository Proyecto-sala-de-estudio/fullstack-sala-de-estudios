import Database from 'better-sqlite3'

const db = new Database('datos.db')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS salas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    edificio TEXT NOT NULL,
    piso TEXT NOT NULL,
    capacidad INTEGER NOT NULL,
    equipamiento TEXT, -- Nuevo campo agregado para los filtros de la HU05
    estado TEXT NOT NULL
  );
`)

export default db
