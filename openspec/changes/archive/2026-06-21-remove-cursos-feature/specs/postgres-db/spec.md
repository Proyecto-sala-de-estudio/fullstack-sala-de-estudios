## MODIFIED Requirements

### Requirement: Inicialización Automática del Esquema
El sistema DEBE inicializar de forma automática las tablas (`salas`, `reservas`) si no existen al momento de iniciar la aplicación Express y conectarse a la base de datos.

#### Scenario: Ejecución de scripts de creación de tablas
- **WHEN** la aplicación Express se inicia y se conecta a una base de datos PostgreSQL vacía
- **THEN** se crean las tablas `salas` (con id serial auto-incremental) y `reservas` (con clave foránea a `salas`).
