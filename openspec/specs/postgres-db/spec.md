# Especificaciones de Requisitos: PostgreSQL Database & Docker

## Purpose
Esta especificación define los requisitos y criterios de aceptación técnicos para el entorno de base de datos relacional PostgreSQL ejecutado en un contenedor Docker para el proyecto de sala de estudios.

## Requirements

### Requirement: Contenedor PostgreSQL en Docker
El sistema MUST ejecutar una instancia de base de datos PostgreSQL dentro de un contenedor gestionado por Docker Compose.

#### Scenario: Inicio del contenedor de base de datos
- **WHEN** se ejecuta el comando `docker-compose up -d` en la raíz del proyecto
- **THEN** se inicia el contenedor de PostgreSQL y queda accesible en el puerto 5432 de localhost.

### Requirement: Configuración mediante Variables de Entorno
El sistema MUST leer los datos de conexión a la base de datos desde variables de entorno definidas en un archivo `.env`. Se debe proveer un archivo `.env.example` de referencia y asegurar que `.env` esté excluido en `.gitignore`.

#### Scenario: Lectura de credenciales al iniciar la API
- **WHEN** se arranca la aplicación Express
- **THEN** el sistema lee los valores de `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD` y `DB_NAME` del archivo `.env` para establecer la conexión.

### Requirement: Persistencia de Datos
El sistema MUST almacenar los datos de la base de datos de manera persistente utilizando volúmenes de Docker.

#### Scenario: Reinicio del contenedor de base de datos
- **WHEN** el contenedor de PostgreSQL es detenido y luego iniciado nuevamente
- **THEN** todas las tablas y datos creados anteriormente permanecen sin cambios.

### Requirement: Inicialización Automática del Esquema
El sistema MUST inicializar de forma automática las tablas (`salas`, `reservas`) si no existen al momento de iniciar la aplicación Express y conectarse a la base de datos.

#### Scenario: Ejecución de scripts de creación de tablas
- **WHEN** la aplicación Express se inicia y se conecta a una base de datos PostgreSQL vacía
- **THEN** se crean las tablas `salas` (con id serial auto-incremental) y `reservas` (con clave foránea a `salas`).
