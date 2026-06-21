## Context

El proyecto actual utiliza una base de datos SQLite embebida mediante la librería `better-sqlite3`. Toda la inicialización de tablas se encuentra en `src/db.js` y las consultas se realizan de forma síncrona en los controladores/rutas. Para mejorar la escalabilidad y preparar el proyecto para producción, se requiere migrar a PostgreSQL utilizando un contenedor de Docker para el entorno local.

## Goals / Non-Goals

**Goals:**
- Contenedorizar PostgreSQL usando Docker Compose con persistencia de datos.
- Reemplazar `better-sqlite3` por `pg` (node-postgres).
- Centralizar la configuración de conexión usando variables de entorno cargadas con `dotenv`.
- Adaptar las consultas SQL y la inicialización de tablas para el dialecto PostgreSQL.
- Mantener la API 100% retrocompatible (sin modificar URLs ni estructuras de respuesta HTTP).

**Non-Goals:**
- Contenedorizar la propia aplicación Express (solo la base de datos corre en Docker por ahora).
- Implementar un framework de migraciones complejo (e.g. Knex, Prisma o Sequelize). Se mantendrá la inicialización automática mediante scripts SQL puros al arrancar.

## Decisions

### Decisión 1: Librería de conexión `pg` (node-postgres)
- **Alternativa 1**: ORM completo (Sequelize / Prisma). Demasiado compleja para los requisitos actuales y requeriría una reescritura masiva de los controladores y rutas.
- **Alternativa 2 (Elegida)**: `pg` (node-postgres). Permite seguir usando consultas SQL puras y se integra de manera sencilla con las llamadas de base de datos existentes. Usaremos `pg.Pool` para gestionar el grupo de conexiones.

### Decisión 2: Adaptación de marcadores de posición (placeholders) y consultas asíncronas
- SQLite utiliza marcadores `?` y llamadas síncronas (e.g. `db.prepare(sql).run()`).
- PostgreSQL utiliza marcadores posicionales (`$1`, `$2`, etc.) y llamadas asíncronas (`await pool.query(...)`).
- **Impacto**: Se deben transformar todas las rutas y servicios que consultan la base de datos para usar funciones `async/await` y actualizar la sintaxis de los placeholders SQL.

### Decisión 3: Captura de IDs autoincrementales
- En SQLite, la inserción retorna un objeto con `lastInsertRowid`.
- En PostgreSQL, para obtener el ID recién generado, agregaremos la cláusula `RETURNING id` al final de cada sentencia `INSERT` y leeremos el valor de la primera fila del resultado (`rows[0].id`).

## Risks / Trade-offs

- **Riesgo**: Colisión de puertos si el puerto 5432 ya está ocupado en la máquina local por otro servicio PostgreSQL.
  - *Mitigación*: Se configurará el puerto del contenedor en el `docker-compose.yml` usando una variable del archivo `.env`, permitiendo cambiar el puerto del host si es necesario (ej: `5433:5432`).
- **Riesgo**: Naturaleza asíncrona de `pg`. Al cambiar la API de síncrona a asíncrona, se debe asegurar el manejo adecuado de errores con bloques `try/catch` para evitar caídas de la API Express.
  - *Mitigación*: Revisión exhaustiva de controladores y uso de middleware o bloques `try/catch` explícitos en las rutas.
