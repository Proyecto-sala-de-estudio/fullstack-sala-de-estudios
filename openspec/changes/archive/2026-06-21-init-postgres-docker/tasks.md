## 1. Setup inicial de Infraestructura y Configuración

- [x] 1.1 Crear el archivo `docker-compose.yml` en la raíz definiendo el servicio de PostgreSQL y su volumen para persistencia.
- [x] 1.2 Instalar la dependencia `pg` y remover `better-sqlite3` de `package.json`.
- [x] 1.3 Crear el archivo `.env.example` con las variables de entorno necesarias (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
- [x] 1.4 Agregar el archivo `.env` al `.gitignore` para evitar subir credenciales al repositorio.

## 2. Migración del Cliente y Esquema de Base de Datos

- [x] 2.1 Modificar `src/db.js` para utilizar `pg.Pool` y cargar la configuración desde variables de entorno.
- [x] 2.2 Reescribir el script de inicialización en `src/db.js` usando sintaxis de PostgreSQL (ej. usar tipo `SERIAL PRIMARY KEY` para IDs y estructurar las tablas de `salas`, `reservas` y `cursos`).

## 3. Migración de Rutas y Servicios a PostgreSQL

- [x] 3.1 Migrar el servicio de cursos en `src/services/cursosService.js` a llamadas asíncronas usando `pg` y actualizar los placeholders SQL de `?` a marcadores posicionales (`$1`, `$2`, etc.), implementando `RETURNING id` en el insert.
- [x] 3.2 Migrar las rutas de cursos en `src/routes/cursos.js` para manejar promesas / llamadas asíncronas con `async/await`.
- [x] 3.3 Migrar las rutas de salas en `src/routes/salas.js` a `async/await` y actualizar consultas de SQLite a PostgreSQL (placeholders posicionales y `RETURNING id` en inserts).
- [x] 3.4 Migrar las rutas de reservas en `src/routes/reservas.js` a `async/await` y adaptar consultas SQL y placeholders posicionales de PostgreSQL.

## 4. Pruebas y Verificación

- [x] 4.1 Iniciar el contenedor Docker de PostgreSQL y verificar que se conecte correctamente la aplicación.
- [x] 4.2 Probar los endpoints `GET`, `POST`, `PUT` y `DELETE` para Cursos, Salas y Reservas usando herramientas como Thunder Client o curl para asegurar la compatibilidad con el frontend.
- [x] 4.3 Detener e iniciar nuevamente el contenedor Docker para verificar la persistencia de los datos creados.
