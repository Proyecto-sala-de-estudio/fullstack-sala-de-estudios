## Context

Actualmente, el backend del proyecto corre de manera fragmentada: la base de datos corre en Docker y la API corre localmente en el host. Para unificar el entorno de ejecución, es necesario empaquetar la aplicación Express utilizando un `Dockerfile` y orquestar ambos servicios (la API y la base de datos) dentro de la misma red virtual de Docker Compose.

## Goals / Non-Goals

**Goals:**
- Empaquetar la API Express en un contenedor usando `node:20-alpine`.
- Modificar `docker-compose.yml` para levantar la API y la base de datos en conjunto.
- Hacer que la API se conecte a la base de datos a través del nombre de servicio de Docker Compose (por ejemplo, `db`).
- Implementar una lógica de reintento de conexión a la base de datos en `src/db.js` para asegurar robustez en el arranque.

**Non-Goals:**
- Configurar despliegues automatizados (CI/CD) a producción.
- Multietapas complejas de compilación para producción (por ahora, una imagen de etapa única es suficiente para desarrollo y testing).

## Decisions

### Decisión 1: Configuración del Dockerfile y .dockerignore
- **Base Image**: Usaremos `node:20-alpine` por ser liviana, contener una versión reciente de Node.js y ser adecuada para entornos de producción y desarrollo.
- **Ignorar**: Excluiremos `node_modules` y archivos `.env` en el `.dockerignore` para garantizar que la compilación se realice de manera limpia instalando dependencias en el contenedor.

### Decisión 2: Orquestación en Docker Compose
- Cambiaremos el nombre del servicio de base de datos en `docker-compose.yml` de `postgres` a `db`.
- Definiremos el servicio `api` que se construirá desde la raíz (`build: .`).
- Configuraremos `depends_on` con la condición de inicio del servicio de base de datos.
- Usaremos la variable de entorno `DB_HOST=db` para la API dentro de Compose.

### Decisión 3: Algoritmo de Reintento de Conexión en `src/db.js`
- Al iniciar la API, el script intentará conectarse a la base de datos mediante un query simple (`SELECT 1`).
- Si la conexión falla (por ejemplo, error `ECONNREFUSED` o similar porque Postgres aún está levantando los sockets internos), el script esperará 2 segundos y volverá a intentar.
- Esta lógica continuará hasta que la conexión sea exitosa, tras lo cual se procederá a ejecutar el script de inicialización de tablas.

## Risks / Trade-offs

- **Riesgo**: Que la API intente levantar y aborte inmediatamente al no encontrar el puerto de la base de datos libre o listo.
  - *Mitigación*: La lógica de reintentos con retraso recursivo en `src/db.js` evita fallas de inicio inmediato en la API.
