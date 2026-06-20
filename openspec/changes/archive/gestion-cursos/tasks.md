# Lista de Tareas de Implementación

Esta es la lista ordenada de tareas para desarrollar la funcionalidad de Gestión de Cursos.

---

## Capa 1: Base de Datos y Servidor Backend

- [x] **Modificar base de datos:** Actualizar el script de inicialización en [db.js](file:///c:/Users/vicen/OneDrive/Escritorio/nombre/backend-sala-de-estudios/src/db.js) para incluir la creación de la tabla `cursos`.
- [x] **Crear la capa de Servicio:** Crear el archivo `src/services/cursosService.js` para proveer métodos de inserción y consulta en SQLite.
- [x] **Crear la capa de Controlador:** Crear el archivo `src/controllers/cursosController.js` con las validaciones de negocio en backend y retorno de códigos HTTP correctos.
- [x] **Crear la capa de Rutas:** Crear el archivo `src/routes/cursos.js` mapeando endpoints a controladores e incluyendo la documentación Swagger OpenAPI.
- [x] **Integrar en la app Express:** Modificar [index.js](file:///c:/Users/vicen/OneDrive/Escritorio/nombre/backend-sala-de-estudios/src/index.js) para importar las rutas de cursos y habilitar la carpeta estática `/public`.

---

## Capa 2: Interfaz de Usuario (Frontend)

- [x] **Crear maquetación HTML:** Escribir el archivo `public/index.html` importando Tailwind CSS, estructurando la página con componentes elegantes y modernos utilizando clases utilitarias del framework.
- [x] **Crear estilos adicionales:** Escribir el archivo `public/style.css` únicamente para configuraciones y animaciones específicas que queden fuera del alcance directo de Tailwind.
- [x] **Crear controlador de lógica JS:** Escribir el archivo `public/app.js` para consumir los endpoints mediante `fetch` vanilla, manejar eventos de formulario, validaciones previas en cliente, renderizado dinámico en DOM y alertas ante errores de red.

---

## Capa 3: Verificación Manual

- [x] **Iniciar servidor local:** Levantar la API y comprobar en consola que inicie correctamente.
- [x] **Probar flujos de éxito:** Registrar múltiples cursos válidos y verificar la inclusión asíncrona.
- [x] **Probar validaciones de campos:** Intentar registrar valores vacíos o créditos inválidos.
- [x] **Probar fallo de servidor:** Apagar el servidor y realizar envíos para confirmar el comportamiento de error visual de la interfaz.
