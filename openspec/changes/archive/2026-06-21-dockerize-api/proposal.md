## Why

Actualmente, solo la base de datos PostgreSQL corre en un contenedor Docker, requiriendo que la API Express se ejecute localmente en la máquina del desarrollador con Node.js instalado. Contenedorizar la API Express y unificarla en la red interna de Docker Compose asegura que todo el backend sea reproducible, portable y fácil de iniciar con un único comando en cualquier entorno.

## What Changes

- Creación de un `Dockerfile` en la raíz del proyecto para empaquetar la aplicación Express.
- Creación de un archivo `.dockerignore` para evitar copiar `node_modules` y `.env` al contexto de construcción del contenedor.
- Modificación del archivo `docker-compose.yml` para incorporar el servicio `api` (que compila el Dockerfile de la raíz) y vincularlo con el servicio de base de datos (usando `depends_on`).
- Configuración de la red interna de Docker Compose para que la API se conecte al host de base de datos usando el nombre del servicio de base de datos en lugar de `localhost`.
- Implementación de un mecanismo de reintento/espera en la conexión de base de datos (`src/db.js`) para evitar que la API falle si PostgreSQL tarda en responder en su arranque inicial.

## Capabilities

### New Capabilities
- `express-api-container`: Containerización de la API Express, orquestación en red de Docker Compose con PostgreSQL, y reintentos de conexión tolerantes a fallos en el inicio.

### Modified Capabilities

## Impact

- **Docker Compose**: Cambios en `docker-compose.yml` para agregar el nuevo servicio y vincular redes.
- **Configuración de Variables de Entorno**: Se actualizará la variable de entorno `DB_HOST` en producción/Docker (ej: configurándola como el nombre del servicio de la base de datos en el compose).
- **Código de Conexión**: Modificación de `src/db.js` para añadir reintentos de conexión con un timeout/delay si la base de datos no está disponible inmediatamente al arrancar.
- **Construcción**: Se introducen los archivos `Dockerfile` y `.dockerignore` en la raíz del proyecto.
