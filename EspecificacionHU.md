# Especificación de Historia de Usuario

## US-03: Reservar sala
**Como** estudiante,  
**quiero** reservar una sala de estudio en un edificio, fecha y horario específicos,  
**para** asegurar un espacio de trabajo disponible para estudiar individualmente o en grupo.

## Criterios de aceptación
- **CA1 (Reserva Exitosa):** El sistema permite seleccionar una sala de estudio del catálogo, ingresar el nombre del estudiante, una fecha y hora específicas. Si la sala está libre y disponible, la reserva se almacena en la base de datos y la interfaz se actualiza inmediatamente mostrando un mensaje de éxito.
- **CA2 (Control de Solapamiento):** Si se intenta registrar una reserva en una sala que ya posee una reserva para la misma fecha y hora exacta, el backend debe rechazar la solicitud con código `400` y un mensaje de error explicativo, y el frontend debe notificar al usuario de manera clara sin alterar los datos actuales.
- **CA3 (Campos Obligatorios):** Todos los campos del formulario (sala, nombre de estudiante, fecha y hora) son requeridos. El frontend no debe permitir el envío del formulario vacío o incompleto.
- **CA4 (Cancelación de Reserva):** El usuario puede cancelar una reserva mediante un botón específico ("Cancelar") al lado de cada registro. Al hacerlo, el backend procesa la eliminación del registro (`DELETE /api/reservas/:id`) y libera de inmediato el horario de la sala para futuras reservas.

## Definition of Done (DoD)
1. El código de la historia está completamente integrado en la rama `main`.
2. El desarrollo se realizó en ramas de trabajo independientes integradas mediante Pull Requests (PR) en GitHub.
3. El frontend Next.js y el backend Express están estructurados y separados en sus respectivos directorios `frontend/` y `backend/`.
4. El backend cuenta con tolerancia a fallos para la inicialización y reconexión a PostgreSQL.
5. Se verificó el funcionamiento de todos los endpoints mediante una colección de pruebas Thunder Client.
6. La aplicación es totalmente contenerizada mediante `docker-compose.yml` y arranca con un solo comando.
