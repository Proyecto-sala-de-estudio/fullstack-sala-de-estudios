# API Sala de Estudios

API REST para la gestión de salas de estudio y reservas de salas. Construida con Node.js, Express y PostgreSQL, documentada con Swagger y desplegada en Render.

- API en produccion: https://backend-sala-de-estudios.onrender.com
- Documentacion interactiva: https://backend-sala-de-estudios.onrender.com/docs

---

## Contenido

- [Tecnologias](#tecnologias)
- [Pre-requisitos y Ejecucion](#pre-requisitos-y-ejecucion)
- [Endpoints](#endpoints)
- [Modelos de datos](#modelos-de-datos)
- [Historias de usuario elegidas](#historias-de-usuario-elegidas)
- [Casos de prueba para las APIs](#casos-de-prueba-para-las-apis)
- [Mapeo SWEBOK a GitHub Flow](#mapeo-swebok-a-github-flow)
- [Evidencia del flujo de Gestion de la Configuracion aplicado](#evidencia-del-flujo-de-gestion-de-la-configuracion-aplicado)
- [Responsabilidades del equipo](#responsabilidades-del-equipo)

---

## Tecnologias

- **Node.js v18+** - entorno de ejecucion JavaScript
- **Express** - framework web minimalista
- **better-sqlite3** - base de datos SQL local, sin servidor
- **Swagger (swagger-ui-express + swagger-jsdoc)** - documentacion interactiva
- **Render** - plataforma de despliegue continuo
- **GitHub Flow** - flujo de trabajo con Issues, Branches, Pull Requests y Releases

---

## Pre-requisitos y Ejecucion

### Pre-requisitos

- Node.js v18+
- Git

### Ejecucion local

Para poner en marcha la aplicacion localmente, ejecute los siguientes comandos en su terminal:

```bash
# instalar dependencias
npm install

# ejecutar el servidor
npm start
```

- API local: http://localhost:3000
- Documentacion: http://localhost:3000/docs

---

## Endpoints

| Metodo | Ruta | Descripcion |
| --- | --- | --- |
| `GET` | `/api/salas` | Lista y filtra las salas de estudio disponibles |
| `GET` | `/api/salas/:id` | Muestra la informacion detallada de una sala especifica |
| `POST` | `/api/salas` | Agrega una nueva sala de estudio |
| `PUT` | `/api/salas/:id` | Modifica los datos de una sala existente |
| `DELETE` | `/api/salas/:id` | Elimina una sala de la base de datos |
| `GET` | `/api/reservas` | Lista todas las reservas realizadas |
| `GET` | `/api/reservas/:id` | Obtiene los detalles de una reserva especifica |
| `POST` | `/api/reservas` | Crea una nueva reserva de sala |
| `PUT` | `/api/reservas/:id` | Modifica los datos de una reserva existente |
| `DELETE` | `/api/reservas/:id` | Elimina o cancela una reserva existente |
| `GET` | `/docs` | Documentacion Swagger interactiva |

---

## Modelos de datos

### Sala

```json
{
  "id": 1,
  "nombre": "Sala A",
  "edificio": "Edificio Central",
  "piso": "Piso 2",
  "capacidad": 10,
  "equipamiento": "Pizarra, Proyector",
  "estado": "disponible"
}
```

### Reserva

```json
{
  "id": 1,
  "salaId": 1,
  "estudiante": "Juan Perez",
  "fecha": "2026-06-20",
  "hora": "14:00"
}
```

---

## Historias de usuario elegidas

1. Las historias de usuario fueron corregidas haciendo uso de "clarita review", que pueden encontrar en [este enlace](https://chatgpt.com/share/6a1da570-116c-83e9-84f7-ced4c2be6858) o en el archivo `./clarita_review_enl.txt`.

2. Las 2 Historias de Usuario elegidas para el desarrollo de la api fueron:

| ID    | Nombre                              | Issue                                                                               |
| :---- | :---------------------------------- | :---------------------------------------------------------------------------------- |
| US-01 | HU01 - Consultar ubicación de salas | [#1](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/issues/1) |
| US-03 | HU03 - Reservar sala                | [#3](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/issues/3) |

---

## Casos de prueba para las APIs

Los casos de prueba para las APIs se encuentran con archivos json en la carpeta `./thunder-collection/`, y se pueden importar a Thunder Client para su ejecución.

---

## Mapeo SWEBOK a GitHub Flow

Esta tabla resume la correspondencia entre los procesos fundamentales de gestion de la configuracion (SWEBOK Capitulo 8) y el flujo de trabajo implementado en GitHub:

| Concepto SWEBOK Cap. 8 | GitHub Flow |
| --- | --- |
| Elemento de Configuracion (2.1.2) | Archivos de codigo fuente, base de datos y esquemas rastreados por Git |
| Linea Base (2.3) | Rama `main` protegida y tags de version (releases) |
| Sucesion (2.5) | Historial de commits organizados cronologicamente |
| Dependencia (2.5) | Archivos package.json y package-lock.json |
| Solicitud de Cambio (3.1) | GitHub Issues especificando mejoras y fallos |
| Comite de Control (3.1.1) | Aprobadores de Pull Requests mediante Branch Protection Rules |
| Implementar cambio (3.2) | Creacion de ramas feature e integracion mediante Merge |
| Auditoria en proceso (5.3) | Proceso de Code Review detallado en los Pull Requests |
| Gestion de versiones (6.2) | Uso de tags semanticos en Git (ej. v1.0.0) |
| Biblioteca de software (2.6) | Releases de GitHub con codigos fuente adjuntos |

---

## Evidencia del flujo de Gestion de la Configuracion aplicado

Este repositorio fue construido siguiendo el flujo de **GitHub Flow** aplicando los procesos de **Software Configuration Management (SWEBOK Cap. 8)**.

### Iteracion HU01 - Consultar ubicacion de salas

| Etapa | Responsable | Evidencia |
|---|---|---|
| Solicitud de Cambio | @JoseIgnacioGC | [Issue #1](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/issues/1) |
| Implementacion | @PugconBeer | Rama `feature/hu01-ubicacion-salas` |
| Pull Request | @PugconBeer | [PR #11](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/pull/11) con descripcion detallada y `Closes #1` |
| Code Review y Aprobacion | @JoseIgnacioGC | Aprobacion formal en el PR |
| Merge a `main` | @JoseIgnacioGC | Fusionado a la rama principal |
| Versionado | No aplica | No se registraron tags de version en esta HU |
| Release | No aplica | No se publicaron releases en GitHub |

### Iteracion HU03 - Reservar sala

| Etapa | Responsable | Evidencia |
|---|---|---|
| Solicitud de Cambio | @JoseIgnacioGC | [Issue #3](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/issues/3) |
| Implementacion | @JoseIgnacioGC | Rama `feature/hu03-reservar-sala` |
| Pull Request | @JoseIgnacioGC | [PR #13](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/pull/13) con descripcion detallada y `Closes #3` |
| Code Review y Aprobacion | @PugconBeer | Aprobacion formal en el PR |
| Merge a `main` | @JoseIgnacioGC | Fusionado a la rama principal |
| Versionado | No aplica | No se registraron tags de version en esta HU |
| Release | No aplica | No se publicaron releases en GitHub |

### Iteracion HU05 - Filtrar salas por caracteristicas

| Etapa | Responsable | Evidencia |
|---|---|---|
| Solicitud de Cambio | @JoseIgnacioGC | [Issue #5](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/issues/5) |
| Implementacion | @PugconBeer | Rama `feature/hu05-filtrar-salas` |
| Pull Request | @PugconBeer | [PR #12](https://github.com/Proyecto-sala-de-estudio/backend-sala-de-estudios/pull/12) con descripcion detallada y `Closes #5` |
| Code Review y Aprobacion | @JoseIgnacioGC | Aprobacion formal en el PR |
| Merge a `main` | @PugconBeer | Fusionado a la rama principal |
| Versionado | No aplica | No se registraron tags de version en esta HU |
| Release | No aplica | No se publicaron releases en GitHub |

---

## Responsabilidades del equipo

| Integrante        | Rol           | Ítems de la rúbrica a cargo           |
| ----------------- | ------------- | ------------------------------------- |
| Vicente Arancibia | Scrum Master  | [4.1 Casos de prueba para las APIs]   |
| Matías Henríquez  | Product Owner | [1.1 Mejora de Historias de Usuario]  |
| José Leiva        | Developer     | [2.1 Desarrollo de dos HU en backend] |
| Martín Leon       | Developer     | [3.1 Uso de GitHub Workflow]          |
