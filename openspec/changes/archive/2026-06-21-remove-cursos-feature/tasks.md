## 1. Modificaciones de Base de Datos y Backend

- [x] 1.1 Modificar `src/db.js` para remover la creación de la tabla `cursos` y su poblado inicial de datos.
- [x] 1.2 Eliminar los archivos físicos de cursos: `src/routes/cursos.js`, `src/controllers/cursosController.js` y `src/services/cursosService.js`.
- [x] 1.3 Modificar `src/index.js` para remover la importación del router de cursos y el middleware `app.use('/api/cursos', cursosRouter)`.
- [x] 1.4 Verificar que la documentación Swagger expuesta en `/docs` ya no liste las rutas de `/api/cursos`.

## 2. Limpieza del Frontend Next.js

- [x] 2.1 Modificar `frontend/app/page.js` eliminando el estado de cursos, llamadas a fetch de `/api/cursos`, el formulario e inputs del curso, y renderizar una landing page simple y limpia enfocada en la reserva de salas.
- [x] 2.2 Verificar que el frontend compila exitosamente sin referencias o errores de importación de cursos.

## 3. Limpieza de Estáticos, Documentación y Pruebas

- [x] 3.1 Eliminar o adaptar los archivos estáticos en `public/index.html`, `public/app.js` y `public/style.css` para que no contengan referencias a cursos.
- [x] 3.2 Eliminar referencias, guías y comandos de cursos del archivo `README.md`.
- [x] 3.3 Eliminar peticiones y carpetas de cursos en las colecciones de Thunder Client en `thunder-collection/`.

## 4. Validación de la Orquestación Docker

- [x] 4.1 Ejecutar `docker compose down -v` y `docker compose up --build -d` para verificar que todos los servicios (db, api, frontend) levantan limpiamente y que la base de datos se inicializa correctamente con salas y reservas.
- [x] 4.2 Probar manualmente los endpoints de `/api/salas` y `/api/reservas` para asegurar que el sistema sigue funcionando a nivel de backend sin la tabla de cursos.
