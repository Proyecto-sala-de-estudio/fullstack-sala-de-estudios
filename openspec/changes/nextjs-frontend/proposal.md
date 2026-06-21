## Why

Actualmente, el proyecto no posee un frontend moderno e independiente, y los recursos estáticos se manejan de manera simplificada en Express. Crear una aplicación frontend independiente utilizando Next.js permite estructurar una interfaz web reactiva, moderna y con mejores prácticas, totalmente desacoplada de la API Express y orquestada en contenedores mediante Docker Compose.

## What Changes

- Creación de una aplicación Next.js dentro del directorio `frontend/` del proyecto.
- Configuración de la conexión a la API Express mediante la variable de entorno `NEXT_PUBLIC_API_URL`.
- Creación de un `Dockerfile` en el directorio `frontend/` y su correspondiente archivo `.dockerignore` para empaquetar la aplicación frontend.
- Modificación del archivo `docker-compose.yml` para introducir el servicio `frontend`, enlazado en el puerto `3001:3000` (o `3001:3001` interno) y configurado con dependencias adecuadas.
- Implementación de la vista principal con:
  - Listado reactivo de los cursos consumidos de la API.
  - Formulario interactivo de creación de cursos con validaciones completas del lado del cliente (nombre, instructor no vacíos, créditos entero positivo mayor que cero).
  - Manejo visual de carga de datos y estados de error si la API de backend no responde.

## Capabilities

### New Capabilities
- `nextjs-web-app`: Interfaz web interactiva del catálogo de cursos desarrollada en Next.js, empaquetada e integrada en el compose de Docker, accesible en el puerto 3001.

### Modified Capabilities

## Impact

- **Estructura del Proyecto**: Nueva carpeta `frontend/` conteniendo la app Next.js.
- **Docker Compose**: Incorporación del servicio `frontend` en `docker-compose.yml`.
- **Variables de Entorno**: Adición de `NEXT_PUBLIC_API_URL` para enrutar llamadas desde el cliente a la API de Express.
- **CORS**: Podría requerirse habilitar CORS en la API de Express si el frontend la consume desde un origen distinto (`localhost:3001` vs `localhost:3000`).
