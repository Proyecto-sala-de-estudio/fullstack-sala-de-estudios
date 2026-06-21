# Especificaciones de Requisitos: Next.js Web App

## Propósito
Esta especificación define los requisitos y criterios de aceptación funcionales y técnicos para el frontend de la aplicación desarrollado en Next.js, ejecutado en un contenedor Docker y expuesto en el puerto 3001.

## Requirements

### Requirement: Acceso a la Aplicación Web en Puerto 3001
El frontend de la aplicación desarrollado en Next.js DEBE ser accesible desde el navegador en `http://localhost:3001`.

#### Scenario: Acceso al sitio principal
- **WHEN** el usuario ingresa a `http://localhost:3001`
- **THEN** el sistema carga la interfaz gráfica de la aplicación Next.js.

### Requirement: Mensajes de Error en Fallas de API
El sistema DEBE desplegar un mensaje de error visible e intuitivo para el usuario si la API de Express no responde a las solicitudes de obtención de datos o de estado.

#### Scenario: API desconectada
- **WHEN** la petición HTTP al endpoint de la API falla (ej: timeout o error 500)
- **THEN** la interfaz oculta los loaders y despliega una notificación de error en pantalla alertando sobre la imposibilidad de conectar con el servidor.
