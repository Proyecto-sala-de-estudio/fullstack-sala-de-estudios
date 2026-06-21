'use client';

import { useState, useEffect, useCallback } from 'react';

export default function Home() {
  const [cursos, setCursos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form fields state
  const [nombre, setNombre] = useState('');
  const [instructor, setInstructor] = useState('');
  const [creditos, setCreditos] = useState('');

  // Field-level error messages
  const [errors, setErrors] = useState({
    nombre: '',
    instructor: '',
    creditos: '',
  });

  // Toast notification state
  const [toast, setToast] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  // Helper to trigger toast notification
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  // Auto-dismiss toast after 5s
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [toast]);

  // Load catalog from API
  const cargarCursos = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await fetch(`${API_URL}/api/cursos`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }
      const data = await response.json();
      setCursos(data);
    } catch (err) {
      console.error('Error al cargar cursos:', err);
      setIsError(true);
      showToast('Error al conectar con el servidor para cargar el catálogo.', 'danger');
    } finally {
      setIsLoading(false);
    }
  }, [API_URL, showToast]);

  // Initial load
  useEffect(() => {
    cargarCursos();
  }, [cargarCursos]);

  // Validate inputs
  const validateForm = () => {
    const tempErrors = { nombre: '', instructor: '', creditos: '' };
    let isValid = true;

    if (!nombre.trim()) {
      tempErrors.nombre = 'El nombre del curso no puede estar vacío.';
      isValid = false;
    }

    if (!instructor.trim()) {
      tempErrors.instructor = 'El nombre del instructor no puede estar vacío.';
      isValid = false;
    }

    if (!creditos.trim()) {
      tempErrors.creditos = 'Los créditos son obligatorios.';
      isValid = false;
    } else {
      const numCreditos = Number(creditos);
      if (isNaN(numCreditos) || !Number.isInteger(numCreditos) || numCreditos <= 0) {
        tempErrors.creditos = 'Los créditos deben ser un número entero positivo mayor que cero.';
        isValid = false;
      }
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_URL}/api/cursos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: nombre.trim(),
          instructor: instructor.trim(),
          creditos: Number(creditos),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        showToast(data.error || 'Error al guardar el curso.', 'danger');
      } else {
        showToast('¡Curso registrado exitosamente!', 'success');
        // Clear fields
        setNombre('');
        setInstructor('');
        setCreditos('');
        setErrors({ nombre: '', instructor: '', creditos: '' });
        // Update list reactively
        setCursos((prevCursos) => [...prevCursos, data]);
      }
    } catch (err) {
      console.error('Error de red al crear curso:', err);
      showToast('No se pudo conectar con el servidor. Revisa tu conexión a internet o el estado de la API.', 'danger');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="layout-container">
      {/* Toast Notification */}
      {toast && (
        <div id="notification" className="notification-container">
          <div className={`toast ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
            <span className="toast-icon">{toast.type === 'success' ? '✅' : '⚠️'}</span>
            <p className="toast-message">{toast.message}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="app-header">
        <div className="header-title-wrapper">
          <span className="header-emoji">📚</span>
          <h1 className="header-title">Sala de Estudios</h1>
        </div>
        <p className="header-subtitle">
          Administra e inscribe materias académicas directamente en el catálogo del sistema.
        </p>
      </header>

      {/* Background glow ornaments */}
      <div className="glow-accent-1"></div>
      <div className="glow-accent-2"></div>

      {/* Main Content Grid */}
      <main className="main-grid">
        {/* Form Section */}
        <section>
          <div className="glass-panel">
            <div className="panel-header">
              <h2 className="panel-title">Registrar Curso</h2>
              <p className="panel-subtitle">Completa la información técnica del curso.</p>
            </div>

            <form id="curso-form" className="form-container" onSubmit={handleSubmit} noValidate>
              {/* Nombre Field */}
              <div className="form-group">
                <label htmlFor="nombre" className="form-label">
                  Nombre del Curso
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ej. Arquitectura de Computadoras"
                  className={`form-input ${errors.nombre ? 'input-invalid' : ''}`}
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                />
                <span id="error-nombre" className="error-message">
                  {errors.nombre}
                </span>
              </div>

              {/* Instructor Field */}
              <div className="form-group">
                <label htmlFor="instructor" className="form-label">
                  Instructor
                </label>
                <input
                  type="text"
                  id="instructor"
                  name="instructor"
                  placeholder="Ej. Dr. Grace Hopper"
                  className={`form-input ${errors.instructor ? 'input-invalid' : ''}`}
                  value={instructor}
                  onChange={(e) => setInstructor(e.target.value)}
                />
                <span id="error-instructor" className="error-message">
                  {errors.instructor}
                </span>
              </div>

              {/* Creditos Field */}
              <div className="form-group">
                <label htmlFor="creditos" className="form-label">
                  Créditos Académicos
                </label>
                <input
                  type="number"
                  id="creditos"
                  name="creditos"
                  min="1"
                  placeholder="Ej. 6"
                  className={`form-input ${errors.creditos ? 'input-invalid' : ''}`}
                  value={creditos}
                  onChange={(e) => setCreditos(e.target.value)}
                />
                <span id="error-creditos" className="error-message">
                  {errors.creditos}
                </span>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-submit"
                className="btn-primary"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? 'Registrando...' : 'Registrar Curso'}</span>
                {isSubmitting && <div className="spinner"></div>}
              </button>
            </form>
          </div>
        </section>

        {/* List Section */}
        <section>
          <div className="glass-panel">
            {/* Title & Badge */}
            <div className="list-header">
              <div className="panel-header">
                <h2 className="panel-title">Catálogo de Cursos</h2>
                <p className="panel-subtitle">Asignaturas registradas en el sistema.</p>
              </div>
              <span id="cursos-count" className="badge-count">
                {cursos.length}
              </span>
            </div>

            {/* Content States */}
            {isLoading ? (
              <div id="loading-state" className="state-container">
                <div className="spinner spinner-large"></div>
                <p className="state-message">Consultando catálogo de asignaturas...</p>
              </div>
            ) : isError ? (
              <div id="error-state" className="state-container">
                <span className="state-emoji">⚠️</span>
                <h3 className="state-title">Error al cargar los cursos</h3>
                <p className="state-message">No fue posible conectarse con la API. Verifica que esté en ejecución.</p>
                <button
                  id="btn-retry"
                  className="btn-secondary"
                  onClick={cargarCursos}
                >
                  Intentar de Nuevo
                </button>
              </div>
            ) : cursos.length === 0 ? (
              <div id="empty-state" className="state-container">
                <span className="state-emoji">📂</span>
                <h3 className="state-title">No hay cursos registrados</h3>
                <p className="state-message">Comienza ingresando los datos a la izquierda para añadir un curso.</p>
              </div>
            ) : (
              <div id="cursos-list" className="courses-grid">
                {cursos.map((curso) => (
                  <div key={curso.id} className="course-card">
                    <div className="course-info">
                      <h3 className="course-title">{curso.nombre}</h3>
                      <p className="course-instructor">
                        <span className="instructor-icon">👤</span> {curso.instructor}
                      </p>
                    </div>
                    <div className="course-footer">
                      <span className="badge-credits">{curso.creditos} CR</span>
                      <span className="course-id">ID: {curso.id}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
