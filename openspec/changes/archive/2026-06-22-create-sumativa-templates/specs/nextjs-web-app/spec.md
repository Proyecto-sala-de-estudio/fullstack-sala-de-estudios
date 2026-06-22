## MODIFIED Requirements

### Requirement: Acceso a la Aplicación Web en Puerto 3001
El frontend de la aplicación desarrollado en Next.js MUST ser accesible desde el navegador en `http://localhost:3001` y ofrecer un panel de control interactivo para las salas y reservas.

#### Scenario: Acceso al sitio principal
- **WHEN** el usuario ingresa a `http://localhost:3001`
- **THEN** el sistema carga la interfaz gráfica de la aplicación Next.js, presentando el catálogo de salas disponibles, el formulario de reservas y el listado de reservas activas.
