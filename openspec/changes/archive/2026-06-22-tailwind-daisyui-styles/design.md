## Context

El frontend de Next.js está diseñado actualmente con estilos CSS personalizados definidos en `frontend/app/globals.css`. La interfaz carece de un sistema de diseño responsivo moderno y premium. Implementaremos Tailwind CSS y la biblioteca de componentes DaisyUI para dotar a la aplicación de un diseño de alta calidad visual, facilidad de mantenimiento y componentes listos para producción.

## Goals / Non-Goals

**Goals:**
- Configurar Tailwind CSS y DaisyUI en el subproyecto `frontend`.
- Reemplazar por completo el archivo `frontend/app/globals.css` para incorporar las directivas de Tailwind.
- Adaptar todo el marcado de la vista principal `frontend/app/page.js` para utilizar componentes DaisyUI (ej. selectores, formularios, botones, tablas y alertas).
- Garantizar responsividad completa para pantallas móviles y de escritorio.

**Non-Goals:**
- No se modificará el backend Express ni la persistencia de datos en PostgreSQL.
- No se agregará lógica de negocio nueva (solo se cambia el diseño visual).

## Decisions

### 1. Uso de Tailwind CSS v4 y DaisyUI
Para el proyecto Next.js, se utilizará Tailwind CSS v4 junto con DaisyUI v5/v4 (instalado como plugin de Tailwind). Tailwind CSS v4 utiliza configuración basada en CSS, lo que simplifica la integración.
* **Alternativa considerada:** Mantener CSS puro. Se descartó porque requiere escribir cientos de clases de utilidad manuales y no acelera el desarrollo.

### 2. Preservar Lógica de Estado y Handlers
Se mantendrán todos los hooks de React (`useState`, `useEffect`) y funciones de gestión de eventos (`handleReservar`, `handleCancelar`, `cargarDatos`) intactos para evitar cualquier regresión funcional en la aplicación Next.js.

## Risks / Trade-offs

- **[Riesgo]** Desajustes visuales o rotura del diseño responsivo.  
  *Mitigación:* Se utilizarán los componentes de grilla de Tailwind y clases utilitarias responsivas (`grid-cols-1 md:grid-cols-2`, `sm:`, etc.) y componentes DaisyUI prediseñados para asegurar un diseño adaptable.
- **[Riesgo]** Conflictos en la compilación de Next.js debido a configuraciones de PostCSS.  
  *Mitigación:* Se verificará la correcta compilación mediante `npm run build` en el frontend antes de la integración.
