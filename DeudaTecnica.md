# Deuda Técnica, Code Smells y Mejoras de Diseño

## 1. Code smells / deuda técnica identificada
| ID    | Ubicación (archivo/módulo) | Descripción del problema | Propuesta de mejora |
|-------|----------------------------|--------------------------|---------------------|
| DT-01 | `frontend/app/page.js` | **Fallback de API hardcodeado:** Se define la URL de fallback `http://localhost:3000` directamente en la lógica del componente principal en caso de no proveer la variable de entorno `NEXT_PUBLIC_API_URL`. | Centralizar la configuración de variables de entorno en un archivo o módulo de configuración (`config.js`) que valide la presencia de variables y lance errores claros en tiempo de construcción/inicio. |
| DT-02 | `backend/src/db.js` (Esquema) | **Tipos de datos de fecha y hora incorrectos:** Los campos `fecha` y `hora` en la tabla `reservas` están definidos como tipo `TEXT` en lugar de usar los tipos nativos `DATE` y `TIME` (o `TIMESTAMP`). | Modificar el esquema de la base de datos para utilizar tipos de datos temporales nativos de PostgreSQL, facilitando búsquedas indexadas y validaciones de rango por zona horaria. |
| DT-03 | `backend/package.json` y `frontend/package.json` | **Ausencia de pruebas automatizadas:** El proyecto no cuenta con frameworks de pruebas unitarias o de integración configurados (ej. Jest, Vitest, Cypress). | Instalar y configurar una suite de pruebas automatizadas para validar el comportamiento del backend (control de solapamiento) y del frontend antes de realizar mezclas (PR). |
| DT-04 | `backend/src/db.js` | **Llamada con efectos secundarios inmediatos al importar:** La función `initDb()` se ejecuta automáticamente al importar el módulo, dificultando la simulación (mocking) y pruebas aisladas de la base de datos. | Exportar la función `initDb` y llamarla explícitamente desde el punto de entrada de la aplicación (`src/index.js`) durante la secuencia de inicialización del servidor. |

## 2. Mejoras de diseño futuras
- **Paginación en el listado de reservas:** Actualmente se cargan todas las reservas registradas. Implementar paginación limitando los registros por página en la API (`LIMIT` y `OFFSET`) y controles de navegación en el frontend reducirá el consumo de recursos y mejorará el rendimiento.
- **Validación robusta en el Backend (Middleware):** Utilizar una librería de validación de esquemas (como Zod o Joi) para sanear y validar las entradas de las reservas antes de que entren al controlador de rutas, desacoplando la validación de la lógica del endpoint.
