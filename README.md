# Sistema de Reservas de Salas de Estudio

## Descripción del sistema
Plataforma para la gestión y reserva de salas de estudio en diferentes edificios, pisos y horarios, diseñada para optimizar los espacios de trabajo colaborativo e individual de los estudiantes.

## Historia de usuario implementada
| ID    | Nombre                    | Issue |
|-------|---------------------------|-------|
| US-03 | Reservar sala             | #3    |
(Debe integrar: búsqueda con filtro, CRUD de una entidad y transacción que une 2+ entidades)

## Artefactos del proyecto
| Artefacto                          | Ubicación / enlace          |
|------------------------------------|-----------------------------|
| Modelo de dominio                  | [Pendiente de creación]     |
| Diagrama de casos de uso           | [Pendiente de creación]     |
| Especificación de HU               | ./EspecificacionHU.md       |
| Diagrama de estados                | [Pendiente de creación]     |
| Diagrama de despliegue y comp.     | [Pendiente de creación]     |
| Diagrama de componentes            | [Pendiente de creación]     |
| Diagrama de secuencia              | [Pendiente de creación]     |
| Casos de prueba                    | ./CasosDePrueba.md          |
| Deuda técnica / code smells        | ./DeudaTecnica.md           |

## Instrucciones de instalación y ejecución
### Requisitos previos
- Node.js v18+
- PostgreSQL (si se ejecuta sin Docker)
- Docker y Docker Compose (para ejecución en contenedores)

### Variables de entorno
Se debe crear un archivo `.env` en la raíz del proyecto basándose en `.env.example`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=sala_estudios
PORT=3000
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Existen dos opciones alternativas e independientes para realizar la instalación y ejecución del sistema:

### Opción A: Ejecución local (Modo Release - Recomendado)
Esta opción compila y despliega de manera automática y contenerizada la base de datos, el backend y el frontend:
```bash
docker compose up --build
```

### Opción B: Ejecución local (Modo Dev - Paso a Paso)
Esta opción permite levantar los servicios en la máquina host local para desarrollo:
```bash
# 1. Configurar variables de entorno en la raíz
cp .env.example .env

# 2. Iniciar únicamente el servicio de base de datos PostgreSQL mediante Docker
docker compose up -d db

# 3. Instalar dependencias e iniciar el Backend (Express)
cd backend
npm install
npm run dev
cd ..

# 4. Instalar dependencias e iniciar el Frontend (Next.js)
cd frontend
npm install
npm run dev
```

### Rutas de acceso de los servicios
Una vez que los servicios estén levantados y listos:
- **Frontend (Interfaz de usuario):** `http://localhost:3001`
- **Backend (API de reservas):** `http://localhost:3000`
- **Documentación interactiva (Swagger):** `http://localhost:3000/docs`
- **Base de Datos (PostgreSQL):** `localhost:5432`

## Responsabilidades del equipo
| Integrante | Rol(es) | Ítems de la rúbrica a cargo |
|------------|---------|-----------------------------|
| Vicente Arancibia | Scrum Master / Quality Assurance | Demostración de la HU y criterios de aceptación, Casos de prueba |
| Matías Henríquez | Arquitecto | Diagrama de despliegue y comp., Diagrama de componentes, Diagrama de secuencia |
| José Leiva | Technical Lead | GitHub workflow, Deuda técnica / code smells |
| Martín León | Developer | HU completa, Instalación y ejecución |

## Bonus (opcional)
- Contenedores: sí — docker-compose en ./docker-compose.yml
- Spec-driven development: sí — especificaciones en ./openspec/
