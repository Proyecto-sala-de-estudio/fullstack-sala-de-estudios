# Especificaciones de Requisitos: Next.js Web App

## Propósito
Esta especificación define los requisitos y criterios de aceptación funcionales y técnicos para el frontend de la aplicación desarrollado en Next.js, ejecutado en un contenedor Docker y expuesto en el puerto 3001.

## Requirements

### Requirement: Acceso a la Aplicación Web en Puerto 3001
El frontend de la aplicación desarrollado en Next.js DEBE ser accesible desde el navegador en `http://localhost:3001`.

#### Scenario: Acceso al sitio principal
- **WHEN** el usuario ingresa a `http://localhost:3001`
- **THEN** el sistema carga la interfaz gráfica de la aplicación Next.js.

### Requirement: Listado de Cursos al Iniciar
El sistema DEBE consultar automáticamente a la API Express y mostrar la lista de cursos al cargar la página principal.

#### Scenario: Carga exitosa de catálogo de cursos
- **WHEN** la página se carga e inicia el cliente web
- **THEN** se realiza una petición HTTP GET a `${NEXT_PUBLIC_API_URL}/api/cursos` y se renderizan los cursos en forma de tarjetas o listado responsivo.

### Requirement: Formulario de Registro de Cursos
El sistema DEBE proveer un formulario de entrada de datos con los campos: Nombre del curso, Instructor y Créditos.

#### Scenario: Enviar formulario válido
- **WHEN** el usuario rellena campos correctos y presiona "Registrar"
- **THEN** se envía un POST a la API de Express y, al retornar éxito, el listado de cursos en pantalla se actualiza agregando el nuevo curso de forma reactiva sin recargar la página completa.

### Requirement: Mensajes de Error en Fallas de API
El sistema DEBE desplegar un mensaje de error visible e intuitivo para el usuario si la API de Express no responde a las solicitudes de obtención o creación.

#### Scenario: API desconectada
- **WHEN** la petición HTTP al endpoint de la API falla (ej: timeout o error 500)
- **THEN** la interfaz oculta los loaders y despliega una notificación de error en pantalla alertando sobre la imposibilidad de conectar con el servidor.

### Requirement: Validaciones en el Cliente
El sistema DEBE realizar validaciones de campos obligatorios en el formulario del lado del cliente antes de enviar la petición a la API.

#### Scenario: Validación de entradas vacías y números incorrectos
- **WHEN** el campo Nombre o Instructor están vacíos, o Créditos no es un entero positivo mayor que cero, y se intenta enviar
- **THEN** se detiene el envío de la petición, se marcan en rojo los inputs inválidos y se muestra el mensaje de error explicativo abajo de cada input.
