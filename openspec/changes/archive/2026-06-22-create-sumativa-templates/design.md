## Context

El repositorio carece actualmente de los documentos estandarizados requeridos por el docente para la entrega final: `EspecificacionHU.md`, `CasosDePrueba.md` y `DeudaTecnica.md`. Además, el `README.md` raíz contiene secciones informativas que difieren del esquema obligatorio de la plantilla 9.1. Se deben crear e integrar estos archivos utilizando la información del repositorio actual y las pautas dadas.

## Goals / Non-Goals

**Goals:**
- Crear `EspecificacionHU.md` en la raíz con la especificación de la HU03.
- Crear `CasosDePrueba.md` en la raíz con tres casos de prueba formales para la HU03.
- Crear `DeudaTecnica.md` en la raíz con la identificación de code smells y mejoras de diseño.
- Adaptar el `README.md` raíz al formato de entrega exacto de la plantilla 9.1.

**Non-Goals:**
- No se modificará el código fuente de la aplicación (backend o frontend).
- No se realizarán alteraciones de base de datos ni de infraestructura Docker.

## Decisions

### 1. Reestructuración del `README.md`
El nuevo archivo `README.md` contendrá exclusivamente:
- Nombre del sistema y descripción.
- Tabla de la Historia de Usuario implementada (US-03).
- Tabla de artefactos del proyecto con sus enlaces.
- Instrucciones de instalación y ejecución (con y sin Docker).
- Tabla de responsabilidades del equipo por rol.
- Declaración de bonus (contenedores y spec-driven).

### 2. Creación de `EspecificacionHU.md`
Detallará la historia `US-03: Reservar sala` (criterios de aceptación del solapamiento de horarios y cancelación, y Definition of Done).

### 3. Creación de `CasosDePrueba.md`
Se documentarán los siguientes 3 casos de prueba con acción y resultado esperado:
- **CP-01:** Crear una reserva exitosa en horario disponible.
- **CP-02:** Intentar reservar una sala en un horario ya ocupado (conflicto 400).
- **CP-03:** Cancelar una reserva activa (confirmación y eliminación).

### 4. Creación de `DeudaTecnica.md`
Identificará:
- Deuda técnica: Falta de pruebas unitarias automatizadas (se ejecutan de forma manual mediante Thunder Client).
- Code smell: Hardcoding del puerto local (3000) en el frontend en caso de que no se provea la variable de entorno, y falta de paginación en la lista de reservas.

## Risks / Trade-offs

- **Riesgo:** Pérdida de documentación previa valiosa del README.
  - **Mitigación:** Asegurar que los datos esenciales (como la tabla SWEBOK y el historial del equipo) sigan referenciados o resumidos dentro de los límites del template, o archivados adecuadamente. En este caso, el template README.md exige un formato estricto que se cumplirá al pie de la letra.
