## 1. Habilitación de CORS en el Backend

- [ ] 1.1 Modificar `src/index.js` en la API Express para agregar un middleware que responda con las cabeceras CORS correspondientes a todas las rutas.

## 2. Creación e Inicialización del Frontend Next.js

- [ ] 2.1 Crear el subdirectorio `frontend/` en la raíz del proyecto.
- [ ] 2.2 Inicializar una aplicación de Next.js en el directorio `frontend/` configurando la estructura base y dependencias de React.

## 3. Desarrollo de la Interfaz del Catálogo de Cursos

- [ ] 3.1 Implementar la página principal en `frontend/` mostrando el listado reactivo de cursos y el formulario de registro.
- [ ] 3.2 Implementar validaciones del lado del cliente en el formulario de creación de cursos.
- [ ] 3.3 Añadir manejo de estados de carga y visualización de mensajes de error si la comunicación con la API falla.

## 4. Empaquetado Docker y Orquestación

- [ ] 4.1 Crear el archivo `Dockerfile` en `frontend/` para compilar y servir la aplicación Next.js.
- [ ] 4.2 Crear el archivo `.dockerignore` en `frontend/` omitiendo carpetas locales.
- [ ] 4.3 Modificar el archivo `docker-compose.yml` en la raíz del proyecto para añadir el servicio `frontend` con mapeo de puerto `3001:3000` y dependiendo del servicio `api`.

## 5. Verificación y Pruebas

- [ ] 5.1 Levantar todo el stack integrado (`db`, `api` y `frontend`) con `docker compose up --build -d` y validar el funcionamiento del flujo de creación y listado desde el navegador en `http://localhost:3001`.
