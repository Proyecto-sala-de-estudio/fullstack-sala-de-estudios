## Why

Actualmente, el código del backend (incluyendo la carpeta `src/`, configuraciones y Dockerfile) se encuentra en la raíz del repositorio, junto al frontend que está en su propia carpeta `frontend/`. Mover el backend a un subdirectorio `backend/` permite tener una estructura de proyecto simétrica y organizada. Sin embargo, para simplificar la orquestación y el consumo de las variables de entorno, mantendremos las variables de entorno (`.env` y `.env.example`), el `Dockerfile` y la colección de Thunder Client en la raíz del proyecto.

## What Changes

- Mover el código y archivos específicos del backend (`src/`, `package.json`, `package-lock.json`, `datos.db`) al nuevo directorio `backend/`.
- Mantener en la raíz del proyecto: `.env`, `.env.example`, `Dockerfile` y `thunder-collection/`.
- Actualizar el `Dockerfile` en la raíz para copiar los archivos de dependencias y el código fuente desde la subcarpeta `backend/`.
- Configurar la carga de variables de entorno en `backend/src/db.js` para que busque el archivo `.env` en la raíz del repositorio de forma relativa.

## Capabilities

### New Capabilities
- Ninguna.

### Modified Capabilities
- `express-api-container`: Ajustar el archivo `Dockerfile` en la raíz para copiar el código y dependencias desde la nueva ubicación del backend (`backend/`).

## Impact

- **Estructura de archivos**: El código del backend (`src`) se ubica ahora en `backend/src`, y sus dependencias en `backend/package.json`.
- **Dockerfile**: Se modifican las rutas del Dockerfile para copiar los recursos desde la carpeta `backend/`.
- **Rutas de desarrollo**: Los comandos de instalación y arranque locales ahora requerirán acceder previamente a la carpeta `backend/` (`cd backend && npm install`).
