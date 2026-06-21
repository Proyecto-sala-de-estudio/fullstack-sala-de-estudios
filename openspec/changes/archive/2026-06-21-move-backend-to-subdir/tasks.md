## 1. Reorganización de Archivos

- [x] 1.1 Crear el directorio `backend` en la raíz del proyecto.
- [x] 1.2 Mover la carpeta de código fuente `src` a `backend/src`.
- [x] 1.3 Mover los archivos de dependencias `package.json` y `package-lock.json` a `backend/`.
- [x] 1.4 Mover el archivo de base de datos local `datos.db` a `backend/datos.db`.

## 2. Ajustes de Código y Docker

- [x] 2.1 Modificar `backend/src/db.js` para cargar el archivo `.env` de la raíz usando rutas relativas.
- [x] 2.2 Actualizar el archivo `Dockerfile` en la raíz del proyecto para copiar los archivos de dependencias y el código fuente desde `backend/`.

## 3. Documentación

- [x] 3.1 Actualizar el archivo `README.md` de la raíz para ajustar los comandos de instalación y arranque local (añadir `cd backend` previo a `npm install` y `npm start`).
