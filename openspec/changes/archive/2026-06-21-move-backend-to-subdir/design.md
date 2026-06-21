## Context

Actualmente el código del backend (`src/`), configuraciones (`package.json`, `.env.example`, `.env`) y el archivo `Dockerfile` se encuentran en el directorio raíz. Moveremos la carpeta `src/`, `package.json`, `package-lock.json` y `datos.db` a una nueva carpeta `backend/`. Mantendremos los archivos de entorno (`.env` y `.env.example`), el `Dockerfile` y `thunder-collection/` en la raíz del proyecto para simplificar la orquestación y el consumo global.

## Goals / Non-Goals

**Goals:**
- Crear la carpeta `backend/` en la raíz del proyecto.
- Mover `src/`, `package.json`, `package-lock.json` y `datos.db` a `backend/`.
- Mantener `.env`, `.env.example`, `Dockerfile` y `thunder-collection/` en la raíz del repositorio.
- Actualizar `Dockerfile` para copiar el código y dependencias desde `backend/`.
- Configurar `backend/src/db.js` para cargar el archivo `.env` de la raíz usando rutas relativas robustas.
- Ajustar la documentación de ejecución en el `README.md` raíz.

**Non-Goals:**
- No se realizarán cambios de lógica en la API, esquemas de bases de datos o funcionalidades de la aplicación.
- No se modificará el frontend.
- No se modificará el contexto de construcción (`build: .`) en `docker-compose.yml`.

## Decisions

### 1. Archivos a mover al directorio `backend/`
Se trasladarán los siguientes recursos:
- Directorio `src/` -> `backend/src/`
- Archivo `package.json` -> `backend/package.json`
- Archivo `package-lock.json` -> `backend/package-lock.json`
- Archivo de base de datos local `datos.db` -> `backend/datos.db`

### 2. Archivos a conservar en la raíz del repositorio
Permanecerán en el directorio raíz:
- Directorio `frontend/`
- Directorio `thunder-collection/`
- Archivos `.env` y `.env.example`
- Archivo `Dockerfile`
- Directorio `openspec/` y `.agent/`
- Archivo `docker-compose.yml`
- Archivo `README.md`
- Archivos de configuración de git y docker (`.gitignore`, `.dockerignore`)

### 3. Ajuste en `Dockerfile`
Modificar el `Dockerfile` en la raíz para copiar los archivos del backend desde la nueva subcarpeta:
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci
COPY backend/src ./src
COPY backend/datos.db ./
EXPOSE 3000
CMD ["npm", "start"]
```

### 4. Ajuste en `backend/src/db.js` para dotenv
Dado que `.env` permanecerá en la raíz del repositorio, al ejecutar `npm start` desde la carpeta `backend/`, el proceso no encontrará el archivo `.env` automáticamente. Ajustaremos `backend/src/db.js` para buscarlo de forma relativa a la ubicación del archivo:
```javascript
import path from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.resolve(__dirname, '../../.env') })
```

## Risks / Trade-offs

- **Riesgo:** Pérdida de variables de entorno al ejecutar localmente.
  - **Mitigación:** La resolución de `dotenv.config` con `path.resolve` relativa al archivo garantiza que la API encuentre el archivo `.env` en la raíz sin importar el directorio de ejecución actual de la terminal.
