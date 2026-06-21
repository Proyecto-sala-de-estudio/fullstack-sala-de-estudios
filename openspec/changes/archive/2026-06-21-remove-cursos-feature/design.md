## Context

El sistema cuenta con un catálogo de "cursos" que inicialmente se usó como ejemplo de implementación, pero que no tiene relación con el propósito del proyecto (reserva de salas de estudio). Debemos eliminarlo de forma limpia del backend (Express), frontend (Next.js), base de datos (PostgreSQL), configuración de Docker y documentación.

## Goals / Non-Goals

**Goals:**
- Eliminar por completo el recurso de cursos de la API y de la inicialización de la base de datos.
- Eliminar la UI de gestión de cursos en el frontend Next.js y dejar una landing page simple y limpia.
- Actualizar el README.md para eliminar referencias a cursos y dejar solo salas y reservas.
- Mantener la integridad de los recursos de "salas" y "reservas" intactos y funcionando en Docker Compose.

**Non-Goals:**
- No se agregará funcionalidad en el frontend Next.js para gestionar salas o reservas en este cambio, simplemente se removerá lo referente a cursos del frontend para dejarlo limpio de código muerto.

## Decisions

### 1. Limpieza del Frontend Next.js
- **Opción A (Recomendada)**: Modificar la UI principal (`frontend/app/page.js`) y sustituirla con una landing page informativa y limpia sobre el "Sistema de Reservas de Salas de Estudio", indicando que el catálogo de cursos ha sido removido y que el backend sirve las APIs de salas y reservas.
- **Opción B**: Eliminar la carpeta `frontend/` por completo.
- **Razón de la decisión**: La Opción A es mejor porque mantiene la estructura de contenedores del frontend Next.js y su configuración en Docker Compose intacta para futuros desarrollos de la interfaz de salas y reservas.

### 2. Eliminación de las dependencias de Base de Datos
- **Opción**: Modificar `src/db.js` para remover la inicialización y el poblado de la tabla `cursos`.
- **Razón**: Evita la persistencia de una tabla huérfana en el contenedor PostgreSQL.

### 3. Eliminación de archivos del backend
- **Opción**: Borrar físicamente los archivos de rutas, controladores y servicios de cursos:
  - `src/routes/cursos.js`
  - `src/controllers/cursosController.js`
  - `src/services/cursosService.js`
- **Razón**: Mantener el código base del backend libre de archivos muertos o sin uso.

## Risks / Trade-offs

- **[Riesgo]** El frontend Next.js podría fallar al iniciar si busca variables o endpoints de cursos.
  - *Mitigación*: Se removerá todo el código de peticiones HTTP (fetch) y el formulario de cursos de `frontend/app/page.js` y se verificará que compile y arranque correctamente en el puerto 3001.
- **[Riesgo]** Problemas con la inicialización de la base de datos.
  - *Mitigación*: Se revisará `src/db.js` para asegurar que las tablas de `salas` y `reservas` no tengan dependencias con la tabla de `cursos` y que se inicialicen de forma autónoma y sin errores.
