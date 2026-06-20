## Why

El README actual del proyecto carece de detalles de implementacion de la API (modelos de datos, endpoints detallados, guia de inicio desde cero) y de la documentacion metodologica sobre el flujo de gestion de la configuracion (SWEBOK y GitHub Flow). Ademas, contiene emojis que le restan seriedad al formato academico y profesional. Esta propuesta busca unificar ambos contenidos en un unico documento formal, serio y coherente con el estado actual del repositorio.

## What Changes

- Modificacion del archivo README.md para incorporar la documentacion detallada de los endpoints de salas, reservas y cursos.
- Eliminacion de todos los emojis del documento para adoptar un tono mas formal y sobrio.
- Actualizacion de la tabla de responsabilidades y mapeo SWEBOK basandonos en la evidencia real obtenida de Git y GitHub CLI.
- Inclusion de una guia de construccion de la API desde cero adaptada a la arquitectura real del proyecto (Node.js, Express, better-sqlite3).
- Detalle del flujo de trabajo de GitHub Flow con la terminologia del capitulo 8 de SWEBOK.

## Capabilities

### New Capabilities
- Ninguna. No se introducen nuevas capacidades funcionales de software.

### Modified Capabilities
- Ninguna. Las especificaciones de los requisitos funcionales del sistema (salas, reservas, cursos) permanecen intactas.

## Impact

El impacto esta acotado exclusivamente al archivo README.md. No hay impacto en el codigo fuente, bases de datos o dependencias de la aplicacion.
