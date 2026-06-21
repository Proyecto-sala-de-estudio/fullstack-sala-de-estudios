## Why

El proyecto actualmente depende de una base de datos local SQLite (`better-sqlite3`), lo cual dificulta la colaboración en entornos de desarrollo heterogéneos y complica el despliegue en producción. Migrar a PostgreSQL corriendo en un contenedor de Docker resuelve la necesidad de instalaciones manuales de base de datos y estandariza el entorno de desarrollo para todo el equipo.

## What Changes

- Introducción de PostgreSQL como motor de base de datos en reemplazo de SQLite.
- Creación de un archivo `docker-compose.yml` para aprovisionar y gestionar el contenedor de PostgreSQL con almacenamiento persistente.
- Uso de variables de entorno mediante un archivo `.env` (con su correspondiente `.env.example`) para manejar de forma segura las credenciales de conexión.
- Actualización de la capa de acceso a datos de la aplicación Express para usar el cliente `pg` (node-postgres) en lugar de `better-sqlite3`.
- Creación de scripts de inicialización o migración de tablas para recrear el esquema de la base de datos (salas, reservas, cursos) en PostgreSQL.

## Capabilities

### New Capabilities
- `postgres-db`: Definición del entorno PostgreSQL en Docker, configuración de conexión mediante variables de entorno y persistencia de datos.

### Modified Capabilities

## Impact

- **Dependencias**: Se agrega la librería `pg` y se remueve `better-sqlite3` una vez completada la migración.
- **Configuración**: Se requiere un archivo `.env` en la raíz del proyecto para definir variables como `DATABASE_URL` (o host, port, user, password, database).
- **Base de datos**: Cambio de base de datos relacional de SQLite a PostgreSQL. Las consultas SQL y tipos de datos se adaptarán a la sintaxis y tipos de PostgreSQL (por ejemplo, `SERIAL` para IDs autoincrementales).
- **Código**: Afecta a `src/db.js` y a todos los archivos que consuman la base de datos de manera directa o mediante servicios (como `src/routes/salas.js`, `src/routes/reservas.js` y `src/services/cursosService.js`).
