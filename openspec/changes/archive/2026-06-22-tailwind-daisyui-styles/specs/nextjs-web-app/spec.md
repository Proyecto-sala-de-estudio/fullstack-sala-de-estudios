## MODIFIED Requirements

### Requirement: Acceso a la Aplicación Web en Puerto 3001
El frontend de la aplicación desarrollado en Next.js MUST ser accesible desde el navegador en `http://localhost:3001`, ofreciendo un panel de control interactivo estilizado y responsivo mediante la biblioteca de componentes DaisyUI y Tailwind CSS.

#### Scenario: Acceso al sitio principal
- **WHEN** el usuario ingresa a `http://localhost:3001`
- **THEN** el sistema carga la interfaz gráfica de la aplicación Next.js con estilos de Tailwind CSS y componentes DaisyUI, presentando el catálogo de salas disponibles, el formulario de reservas y el listado de reservas activas de forma responsiva.
