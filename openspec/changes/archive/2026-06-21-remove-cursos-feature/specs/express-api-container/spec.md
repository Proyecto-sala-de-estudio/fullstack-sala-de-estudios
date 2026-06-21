## MODIFIED Requirements

### Requirement: Contenedorización de la API Express (Dockerfile)
El sistema DEBE empaquetar la aplicación Express en un contenedor Docker utilizando un archivo `Dockerfile` optimizado y un archivo `.dockerignore` para evitar subir archivos no deseados.

#### Scenario: Construcción del contenedor de la API
- **WHEN** se ejecuta el comando `docker build -t backend-api .` en la raíz del proyecto
- **THEN** se compila exitosamente la imagen del contenedor basándose en Node.js, copiando los archivos necesarios y omitiendo `node_modules` y `.env`.
