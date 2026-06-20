# Especificaciones de Requisitos: Gestión de Cursos

Este documento detalla las especificaciones de comportamiento del sistema y criterios de aceptación técnicos.

---

## 1. Entidad de Cursos

Cada registro de curso debe poseer las siguientes propiedades y tipos de datos en la base de datos:

| Propiedad | Tipo | Restricciones | Descripción |
| :--- | :--- | :--- | :--- |
| `id` | Entero | Primary Key, Auto-increment | Identificador único del curso. |
| `nombre` | Texto | NOT NULL, No Vacío (al menos 1 caracter no-blanco) | Nombre descriptivo de la materia. |
| `instructor` | Texto | NOT NULL, No Vacío (al menos 1 caracter no-blanco) | Nombre del profesor encargado de impartir la clase. |
| `creditos` | Entero | NOT NULL, Positivo (> 0) | Carga académica en créditos. |

---

## 2. Flujos y Comportamiento

### Flujo A: Listar Cursos Existentes
* **Trigger:** El usuario abre o recarga la página principal del navegador.
* **Comportamiento:**
  1. La interfaz muestra un indicador visual de carga ("Cargando catálogo...").
  2. Envía petición `GET /api/cursos`.
  3. Si la respuesta es exitosa (`200 OK` con un array de cursos), remueve el loader y renderiza los cursos en forma de tarjetas responsivas.
  4. Si no hay cursos disponibles en el array recibido, oculta el loader y despliega un panel de "Estado Vacío" (Empty State).

### Flujo B: Registrar Nuevo Curso
* **Trigger:** El usuario rellena los campos en el formulario y hace clic en "Registrar Curso".
* **Validaciones del Lado del Cliente (Antes de enviar petición):**
  * `nombre` no puede estar vacío ni contener solo espacios.
  * `instructor` no puede estar vacío ni contener solo espacios.
  * `creditos` no puede estar vacío, y debe ser un número entero positivo mayor que 0.
  * En caso de incumplimiento, se detiene el envío, se resalta el campo infractor en rojo y se muestra un mensaje de texto de error justo debajo del input.
* **Proceso de Envío:**
  1. Se bloquea el botón de envío y se muestra un spinner dentro del botón para evitar clics repetidos.
  2. Envía petición `POST /api/cursos` con cabecera `Content-Type: application/json` y el objeto JSON.
  3. Si el servidor retorna éxito (`201 Created` junto con el objeto de curso con ID asignado):
     * Muestra un Toast exitoso temporal (color verde).
     * Limpia todos los campos del formulario.
     * Añade dinámicamente el nuevo curso a la interfaz y actualiza el contador de la lista sin recargar la página.
  4. Si el servidor retorna un error (`400 Bad Request`):
     * Muestra un Toast de advertencia (color rojo) con el texto explicativo provisto por la API.

### Flujo C: Fallo de Conexión del Servidor
* **Comportamiento:**
  * Si el fetch falla (red caída, servidor apagado, timeout), el bloque `catch` atrapa la excepción.
  * Oculta cualquier indicador de carga.
  * Muestra una notificación Toast de peligro persistente / visible: *"No se pudo conectar con el servidor. Revisa tu conexión a internet o el estado de la API."*.
  * Si la falla ocurre durante la carga inicial de cursos, muestra un mensaje central en la sección de listado con un botón de **Reintentar**.
