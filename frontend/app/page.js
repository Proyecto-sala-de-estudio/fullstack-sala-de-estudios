'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('loading'); // 'loading' | 'online' | 'offline'
  const [salasCount, setSalasCount] = useState(0);
  const [reservasCount, setReservasCount] = useState(0);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  useEffect(() => {
    async function checkApi() {
      try {
        // Fetch rooms to check API connection
        const resSalas = await fetch(`${API_URL}/api/salas`);
        if (!resSalas.ok) throw new Error('API offline');
        const dataSalas = await resSalas.json();
        setSalasCount(dataSalas.length);

        // Fetch reservations count
        const resReservas = await fetch(`${API_URL}/api/reservas`);
        if (resReservas.ok) {
          const dataReservas = await resReservas.json();
          setReservasCount(dataReservas.length);
        }

        setApiStatus('online');
      } catch (err) {
        console.error('Error connecting to backend API:', err);
        setApiStatus('offline');
      }
    }
    checkApi();
  }, [API_URL]);

  return (
    <div className="layout-container">
      {/* Header */}
      <header className="app-header">
        <div className="header-title-wrapper">
          <span className="header-emoji">🏫</span>
          <h1 className="header-title">Sala de Estudios</h1>
        </div>
        <p className="header-subtitle">
          Sistema de gestión de espacios y reservas académicas.
        </p>
      </header>

      {/* Background glow ornaments */}
      <div className="glow-accent-1"></div>
      <div className="glow-accent-2"></div>

      {/* Main Content Grid */}
      <main className="main-grid">
        {/* Connection status section (Left) */}
        <section>
          <div className="glass-panel">
            <div className="panel-header">
              <h2 className="panel-title">Estado del Servidor</h2>
              <p className="panel-subtitle">Conectividad en tiempo real con la API.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem',
                borderRadius: '0.5rem',
                backgroundColor: 'rgba(3, 7, 18, 0.5)',
                border: '1px solid var(--border-color)'
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: '600' }}>API Backend:</span>
                {apiStatus === 'loading' ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <div className="spinner"></div> Verificando...
                  </span>
                ) : apiStatus === 'online' ? (
                  <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--success-color)' }}>
                    🟢 ONLINE
                  </span>
                ) : (
                  <span style={{ fontSize: '0.875rem', fontWeight: 'bold', color: 'var(--error-color)' }}>
                    🔴 OFFLINE
                  </span>
                )}
              </div>

              {apiStatus === 'online' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span>Salas registradas en BD:</span>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{salasCount}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    <span>Reservas activas en BD:</span>
                    <span style={{ color: '#fff', fontWeight: 'bold' }}>{reservasCount}</span>
                  </div>
                </div>
              )}

              {apiStatus === 'offline' && (
                <p style={{ fontSize: '0.75rem', color: 'var(--error-color)', lineHeight: '1.4' }}>
                  Asegúrate de que la API de Express esté corriendo en {API_URL} y de que la base de datos esté lista para recibir conexiones.
                </p>
              )}
            </div>

            <a href={`${API_URL}/docs`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: 'none' }}>
              <span>Explorar Documentación (Swagger)</span>
              <span>⚡</span>
            </a>
          </div>
        </section>

        {/* Modules section (Right) */}
        <section>
          <div className="glass-panel">
            <div className="panel-header">
              <h2 className="panel-title">Módulos del Proyecto</h2>
              <p className="panel-subtitle">El catálogo de cursos ha sido removido. El sistema ahora se enfoca al 100% en las reservas de salas.</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Module 1: Salas */}
              <div style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                backgroundColor: 'rgba(3, 7, 18, 0.4)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: '1.5rem' }}>🚪</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>Gestión de Salas</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    Permite dar de alta salas de estudio, modificar capacidades, definir equipamientos (pizarras, proyectores, etc.) y filtrar por su estado de disponibilidad.
                  </p>
                </div>
              </div>

              {/* Module 2: Reservas */}
              <div style={{
                padding: '1.25rem',
                borderRadius: '0.75rem',
                backgroundColor: 'rgba(3, 7, 18, 0.4)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
              }}>
                <span style={{ fontSize: '1.5rem' }}>📅</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#fff' }}>Reservas de Salas</h3>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                    Permite a los estudiantes reservar salas específicas para fechas y horarios determinados. Valida automáticamente la disponibilidad para evitar solapamientos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
