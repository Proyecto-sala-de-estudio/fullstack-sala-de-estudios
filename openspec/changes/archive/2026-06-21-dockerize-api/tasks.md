## 1. Archivos de Construcción de Contenedores

- [x] 1.1 Crear el archivo `Dockerfile` en la raíz del proyecto configurado para copiar archivos, instalar dependencias e iniciar la API Express.
- [x] 1.2 Crear el archivo `.dockerignore` en la raíz del proyecto omitiendo carpetas locales como `node_modules` y archivos `.env`.

## 2. Configuración de Orquestación y Conectividad

- [x] 2.1 Modificar `docker-compose.yml` para renombrar el servicio de base de datos a `db` e introducir el servicio `api` con puerto `3000:3000` expuesto, enlazado en red y dependiente de `db`.
- [x] 2.2 Actualizar el archivo `.env.example` y el `.env` local para usar `db` en la variable `DB_HOST` dentro del contexto del contenedor.

## 3. Resiliencia de Conexión en Base de Datos

- [x] 3.1 Modificar `src/db.js` para envolver la conexión inicial en una función con reintentos automáticos recursivos en caso de fallo de inicio de base de datos.

## 4. Pruebas y Validación de la API Containerizada

- [x] 4.1 Levantar ambos servicios compilando la nueva imagen utilizando el comando `docker compose up --build -d` y verificar el estado y los logs de la API.
- [x] 4.2 Probar que los endpoints respondan correctamente consultando la API en `http://localhost:3000/api/cursos` desde el host.
