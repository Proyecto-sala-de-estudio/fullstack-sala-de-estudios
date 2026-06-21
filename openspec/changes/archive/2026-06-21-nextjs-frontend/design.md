## Context

Para brindar una interfaz gráfica al sistema, crearemos un cliente web utilizando Next.js dentro del directorio `frontend/` del proyecto. Este frontend se ejecutará en su propio contenedor dentro de la red de Docker Compose, comunicándose con la API Express mediante llamadas HTTP del lado del cliente.

## Goals / Non-Goals

**Goals:**
- Crear la aplicación Next.js estructurada bajo la carpeta `frontend/`.
- Escribir un `Dockerfile` y `.dockerignore` para el frontend.
- Integrar el servicio `frontend` en `docker-compose.yml` expuesto en el puerto 3001.
- Habilitar el soporte de CORS (Cross-Origin Resource Sharing) en la API Express para permitir peticiones desde el origen del frontend (`localhost:3001`).
- Desarrollar la interfaz con listado de cursos, formulario de registro, validaciones en cliente y gestión de errores.

**Non-Goals:**
- Implementar una suite de diseño de componentes compleja (e.g. Storybook).
- Implementar Server-Side Rendering (SSR) dinámico para el catálogo; la carga y creación de datos se realizará en el cliente (Client-Side Rendering) para simplificar la interacción y reactividad de los formularios.

## Decisions

### Decisión 1: Configuración de CORS en el Backend (API Express)
- Dado que el frontend correrá en `http://localhost:3001` y la API en `http://localhost:3000`, los navegadores bloquearán las llamadas cruzadas por políticas de Same-Origin.
- **Solución**: Agregaremos un middleware simple en `src/index.js` que habilite las cabeceras CORS (`Access-Control-Allow-Origin: *`, etc.) para resolver el bloqueo sin necesidad de instalar dependencias externas.

### Decisión 2: Estructura del Frontend Next.js
- Crearemos la aplicación Next.js y configuraremos el archivo principal (usando App Router, `app/page.js`) para mostrar un diseño limpio con un listado de cursos y un formulario lateral de registro.
- Usaremos TailwindCSS o CSS nativo (Vanilla CSS) con un diseño premium, limpio y moderno.

### Decisión 3: Dockerfile para el Frontend
- Usaremos `node:20-alpine` como imagen base para el frontend.
- La imagen compilará la aplicación Next.js (`npm run build`) durante la construcción del contenedor y la servirá mediante `npm start` expuesta en el puerto 3000 del contenedor, el cual mapearemos al puerto `3001` del host.
- Pasaremos la variable `NEXT_PUBLIC_API_URL` en el proceso de construcción/entorno.

## Risks / Trade-offs

- **Riesgo**: Bloqueo de CORS si no se configura de manera adecuada.
  - *Mitigación*: Validación de llamadas preflight (OPTIONS) y cabeceras de origen en el middleware de Express.
