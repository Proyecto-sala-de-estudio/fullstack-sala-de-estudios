# Propuesta: Gestión de Cursos desde el Navegador

## Historia de Usuario
Como usuario de la aplicación, quiero ver el listado de cursos disponibles y poder agregar nuevos cursos desde el navegador, para no depender de herramientas externas como Thunder Client o curl.

## Alcance y Objetivos
El objetivo principal es implementar un panel de control interactivo (frontend) integrado en el mismo servidor de la aplicación Express, utilizando **Tailwind CSS** para un diseño con estilos elegantes y modernos. Esto permitirá la visualización de los cursos existentes y el registro de nuevos cursos mediante un formulario con validación local y en servidor.

### Funcionalidades Incluidas:
1. **Visualización de Cursos:** Listado dinámico de asignaturas académicas que se carga al iniciar la interfaz del cliente.
2. **Registro de Cursos:** Formulario interactivo que permite añadir un curso con Nombre, Instructor y Créditos.
3. **Validación del Lado del Cliente y del Servidor:** Restricciones estrictas para evitar registros vacíos o créditos que no cumplan con ser enteros positivos mayores a cero.
4. **Manejo de Errores Resiliente:** Visualización clara de notificaciones en caso de fallo de red o errores de validación.

### Fuera de Alcance (en esta etapa):
* Edición o eliminación de cursos.
* Autenticación o roles de usuario.
* Paginación avanzada o filtrado de cursos (se mostrará la lista completa).
