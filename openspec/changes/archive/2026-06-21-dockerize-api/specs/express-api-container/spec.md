## ADDED Requirements

### Requirement: Contenedorización de la API Express (Dockerfile)
El sistema DEBE empaquetar la aplicación Express en un contenedor Docker utilizando un archivo `Dockerfile` optimizado y un archivo `.dockerignore` para evitar subir archivos no deseados.

#### Scenario: Construcción del contenedor de la API
- **WHEN** se ejecuta el comando `docker build -t backend-api .` en la raíz del proyecto
- **THEN** se compila exitosamente la imagen del contenedor basándose en Node.js, copiando los archivos necesarios y omitiendo `node_modules` y `.env`.

### Requirement: Orquestación Unificada con Docker Compose
El sistema DEBE permitir levantar la API Express y la base de datos PostgreSQL en conjunto mediante un solo comando de Docker Compose, exponiendo la API al host en el puerto 3000.

#### Scenario: Inicio unificado de servicios
- **WHEN** se ejecuta `docker compose up -d`
- **THEN** se inician tanto el contenedor de la API como el contenedor de PostgreSQL, quedando la API accesible desde el host en `http://localhost:3000` y la base de datos conectada a la API mediante la red interna de Docker Compose.

### Requirement: Tolerancia a Fallos en Conexión Inicial (Reintentos)
El sistema DEBE reintentar la conexión a la base de datos PostgreSQL de forma automática si esta no está lista para aceptar conexiones cuando la API se inicia.

#### Scenario: PostgreSQL tarda en arrancar
- **WHEN** el contenedor de la API inicia antes de que PostgreSQL haya terminado de inicializarse por completo
- **THEN** la API espera un intervalo de tiempo corto (ej. 2 segundos) y reintenta la conexión de forma consecutiva hasta lograr establecerla correctamente, en lugar de terminar el proceso inmediatamente.
