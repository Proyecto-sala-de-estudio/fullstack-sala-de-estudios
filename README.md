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

### Instalación y ejecución (sin Docker)
```bash
# 1. Configurar variables de entorno en la raíz
cp .env.example .env

# 2. Iniciar el servicio de base de datos PostgreSQL
docker compose up -d db

# 3. Instalar e iniciar el Backend (Express)
cd backend
npm install
npm run dev
cd ..

# 4. Instalar e iniciar el Frontend (Next.js)
cd frontend
npm install
npm run dev
```

### Instalación y ejecución (con Docker)
```bash
docker-compose up --build
```

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
