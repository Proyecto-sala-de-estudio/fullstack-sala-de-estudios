## MODIFIED Requirements

### Requirement: Contenedorización de la API Express (Dockerfile)
El sistema MUST empaquetar la aplicación Express en un contenedor Docker utilizando un archivo `Dockerfile` optimizado y un archivo `.dockerignore` ubicados en la raíz del proyecto, copiando los archivos de dependencias y el código fuente desde el subdirectorio `backend/`.

#### Scenario: Construcción del contenedor de la API
- **WHEN** se ejecuta el comando `docker build -t backend-api .` en la raíz del proyecto
- **THEN** se compila exitosamente la imagen del contenedor basándose en Node.js, copiando las dependencias (`backend/package*.json`) y el código fuente (`backend/src`) al contenedor, omitiendo `node_modules` y `.env`.
