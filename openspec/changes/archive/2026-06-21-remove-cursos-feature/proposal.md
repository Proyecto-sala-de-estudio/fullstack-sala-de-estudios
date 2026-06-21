## Why

El proyecto actual contiene código y configuraciones para gestionar "cursos" (tabla en base de datos, endpoints del backend, vistas del frontend y documentación). Esta funcionalidad es ajena al propósito principal de la plataforma, que es únicamente la reserva y gestión de salas de estudio, por lo que debe ser completamente removida para simplificar y limpiar el proyecto.

## What Changes

- **Remoción en Base de Datos**: Eliminar la creación y el poblado de la tabla `cursos` en la inicialización de la base de datos PostgreSQL.
- **Remoción en Backend**:
  - Eliminar los archivos de rutas, controladores y servicios asociados a cursos.
  - Quitar el registro del router de cursos en `src/index.js`.
  - Quitar la documentación OpenAPI de cursos de Swagger en `/docs`.
- **Remoción en Frontend**: Eliminar la interfaz de usuario en Next.js correspondiente a la visualización y creación de cursos.
- **Remoción en Documentación**: Quitar del `README.md` todas las referencias y guías de uso sobre la gestión de cursos.
- **Remoción en Colecciones**: Eliminar las llamadas de cursos de la colección de Thunder Client.

## Capabilities

### New Capabilities
<!-- None -->

### Modified Capabilities
- `cursos`: Eliminar por completo esta especificación del catálogo.
- `express-api-container`: Eliminar la capacidad de servir y documentar el recurso de cursos.
- `postgres-db`: Eliminar la tabla `cursos` de la base de datos.
- `nextjs-web-app`: Eliminar del frontend las secciones y formularios vinculados a la visualización y creación de cursos.

## Impact

- **Código Backend**: Afecta a `src/index.js`, `src/routes/cursos.js` (eliminado), `src/controllers/cursosController.js` (eliminado), `src/services/cursosService.js` (eliminado).
- **Código Base de Datos**: Afecta a `src/db.js` (inicialización de tablas y poblado de datos).
- **Código Frontend**: Afecta a `frontend/app/page.js` y posibles componentes del listado y creación de cursos.
- **Docker**: Aunque la configuración del contenedor Express y PostgreSQL no cambiará estructuralmente, se debe comprobar que `docker-compose.yml` siga funcionando correctamente.
- **Documentación y Colecciones**: Afecta a `README.md` y colecciones de Thunder Client en `thunder-collection/`.
