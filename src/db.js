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
    equipamiento TEXT,
    estado TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS reservas (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    salaId INTEGER NOT NULL,
    estudiante TEXT NOT NULL,
    fecha TEXT NOT NULL,
    hora TEXT NOT NULL,
    FOREIGN KEY (salaId) REFERENCES salas(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS cursos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    instructor TEXT NOT NULL,
    creditos INTEGER NOT NULL
  );
`)

export default db
