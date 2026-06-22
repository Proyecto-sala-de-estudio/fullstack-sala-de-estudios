'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [apiStatus, setApiStatus] = useState('loading');
  const [salas, setSalas] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [selectedSalaId, setSelectedSalaId] = useState('');
  const [estudiante, setEstudiante] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [toast, setToast] = useState(null);
  const [toastTimeout, setToastTimeout] = useState(null);
  const [mounted, setMounted] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const fetchData = async () => {
    try {
      const resSalas = await fetch(`${API_URL}/api/salas`);
      if (!resSalas.ok) throw new Error();
      const dataSalas = await resSalas.json();
      setSalas(dataSalas);

      const resReservas = await fetch(`${API_URL}/api/reservas`);
      if (resReservas.ok) {
        const dataReservas = await resReservas.json();
        setReservas(dataReservas);
      }
      setApiStatus('online');
    } catch (err) {
      setApiStatus('offline');
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchData();
    return () => {
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  }, [API_URL]);

  const showToast = (message, type) => {
    if (toastTimeout) clearTimeout(toastTimeout);
    setToast({ message, type });
    const timeout = setTimeout(() => setToast(null), 4000);
    setToastTimeout(timeout);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSalaId || !estudiante || !fecha || !hora) {
      showToast('Por favor completa todos los campos obligatorios', 'error');
      return;
    }
    setLoadingSubmit(true);
    try {
      const res = await fetch(`${API_URL}/api/reservas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          salaId: Number(selectedSalaId),
          estudiante,
          fecha,
          hora
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Error al registrar la reserva');
      }
      showToast('¡Reserva registrada correctamente!', 'success');
      setEstudiante('');
      setFecha('');
      setHora('');
      setSelectedSalaId('');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleCancel = async (id) => {
    if (!confirm('¿Estás seguro de que deseas cancelar esta reserva?')) {
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/reservas/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Error al cancelar la reserva');
      }
      showToast('Reserva cancelada correctamente', 'success');
      fetchData();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  const getSalaName = (salaId) => {
    const sala = salas.find(s => s.id === salaId);
    return sala ? `${sala.nombre} (${sala.edificio})` : `Sala #${salaId}`;
  };

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-slate-100 flex flex-col items-center justify-start p-4 md:p-12 overflow-x-hidden font-sans z-10">
      
      {/* Background Glow Accents */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* Toast Notifications container */}
      {toast && (
        <div className="toast toast-top toast-end z-[100] max-w-sm w-full pointer-events-auto p-4">
          <div className={`alert ${toast.type === 'success' ? 'alert-success' : 'alert-error'} shadow-2xl flex gap-2 font-semibold text-white`}>
            <span>{toast.type === 'success' ? '✓' : '⚠️'}</span>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="w-full max-w-6xl text-center flex flex-col gap-2 mb-10 z-10">
        <div className="flex items-center justify-center gap-3">
          <span className="text-4xl md:text-5xl">🏫</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">
            Sala de Estudios
          </h1>
        </div>
        <p className="text-slate-400 text-sm md:text-base max-w-xl mx-auto">
          Sistema de gestión de espacios y reservas académicas.
        </p>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full max-w-6xl z-10 items-start">
        
        {/* Left column (Booking Form + Active Bookings) */}
        <div className="lg:col-span-5 flex flex-col gap-8 w-full">
          
          {/* New Reservation Card */}
          <section className="card bg-slate-900/40 backdrop-blur-md border border-slate-800/60 shadow-2xl p-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold text-white">Nueva Reserva</h2>
              <p className="text-slate-400 text-xs">Completa los datos para agendar una sala.</p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-300 font-semibold text-xs uppercase tracking-wider">Sala de Estudio</span>
                </label>
                <select
                  value={selectedSalaId}
                  onChange={(e) => setSelectedSalaId(e.target.value)}
                  className="select select-bordered w-full bg-slate-950/50 text-slate-100 border-slate-700/60 focus:border-indigo-500 focus:outline-none"
                  required
                >
                  <option value="">Selecciona una sala...</option>
                  {salas.map((sala) => (
                    <option key={sala.id} value={sala.id} disabled={sala.estado !== 'disponible'}>
                      {sala.nombre} - {sala.edificio} ({sala.estado})
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text text-slate-300 font-semibold text-xs uppercase tracking-wider">Nombre del Estudiante</span>
                </label>
                <input
                  type="text"
                  value={estudiante}
                  onChange={(e) => setEstudiante(e.target.value)}
                  placeholder="Ej. Juan Pérez"
                  className="input input-bordered w-full bg-slate-950/50 text-slate-100 border-slate-700/60 focus:border-indigo-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-slate-300 font-semibold text-xs uppercase tracking-wider">Fecha</span>
                  </label>
                  <input
                    type="date"
                    value={fecha}
                    onChange={(e) => setFecha(e.target.value)}
                    className="input input-bordered w-full bg-slate-950/50 text-slate-100 border-slate-700/60 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>

                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-slate-300 font-semibold text-xs uppercase tracking-wider">Hora</span>
                  </label>
                  <input
                    type="time"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="input input-bordered w-full bg-slate-950/50 text-slate-100 border-slate-700/60 focus:border-indigo-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={mounted ? (loadingSubmit || apiStatus !== 'online') : false} 
                className="btn btn-primary w-full text-white shadow-lg shadow-indigo-600/35 hover:scale-[1.01] active:scale-[0.99] transition-transform mt-2"
              >
                {loadingSubmit ? <span className="loading loading-spinner loading-sm"></span> : 'Confirmar Reserva'}
              </button>
            </form>
          </section>

          {/* Active Bookings Card */}
          <section className="card bg-slate-900/40 backdrop-blur-md border border-slate-800/60 shadow-2xl p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
              <h2 className="text-xl font-bold text-white">Reservas Activas</h2>
              <span className="badge badge-primary font-bold text-xs">{reservas.length}</span>
            </div>

            {reservas.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <span className="text-4xl mb-2">📅</span>
                <p className="font-semibold text-slate-300 text-sm">No hay reservas activas</p>
                <p className="text-xs text-slate-500 text-center mt-1">Las salas están disponibles para ser reservadas.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[380px] overflow-y-auto pr-1">
                {reservas.map((reserva) => (
                  <div 
                    key={reserva.id} 
                    className="card bg-slate-950/30 border border-slate-800/80 p-4 flex flex-col gap-3 rounded-xl hover:border-slate-700/60 transition-colors"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="font-bold text-slate-100 text-sm">{reserva.estudiante}</h3>
                      <div className="flex flex-col gap-0.5 text-xs text-slate-400">
                        <span className="flex items-center gap-1.5">
                          <span className="text-slate-500">🚪</span> {getSalaName(reserva.salaId)}
                        </span>
                        <span className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-slate-500">📅</span> {reserva.fecha} a las {reserva.hora}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between border-t border-slate-900 pt-3">
                      <span className="text-[10px] font-mono text-slate-600">ID: #{reserva.id}</span>
                      <button
                        onClick={() => handleCancel(reserva.id)}
                        className="btn btn-error btn-xs px-3 text-white shadow-sm hover:scale-[1.03] transition-transform"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column (Room Catalog) */}
        <section className="lg:col-span-7 card bg-slate-900/40 backdrop-blur-md border border-slate-800/60 shadow-2xl p-6 flex flex-col gap-6 w-full">
          <div className="flex items-center justify-between border-b border-slate-800/60 pb-3">
            <h2 className="text-xl font-bold text-white">Catálogo de Salas</h2>
            <span className="badge badge-success text-white font-bold text-xs">{salas.length}</span>
          </div>

          {apiStatus === 'loading' ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <span className="loading loading-spinner loading-lg text-indigo-500"></span>
              <p className="text-xs text-slate-400">Cargando salas...</p>
            </div>
          ) : apiStatus === 'offline' ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-3 text-center">
              <span className="text-4xl animate-pulse">🔴</span>
              <p className="font-bold text-white text-sm">Servidor desconectado</p>
              <p className="text-xs text-slate-500 max-w-xs">
                No se pudo establecer conexión con la API en <code className="bg-slate-950 px-1.5 py-0.5 rounded text-indigo-400">{API_URL}</code>.
              </p>
              <button onClick={fetchData} className="btn btn-primary btn-sm text-white mt-2 px-6">
                Reintentar
              </button>
            </div>
          ) : salas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-slate-400 gap-2">
              <span className="text-4xl">🚪</span>
              <p className="font-bold text-white text-sm">No hay salas registradas</p>
              <p className="text-xs text-slate-500">Agrega salas mediante la API o base de datos.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[620px] overflow-y-auto pr-1">
              {salas.map((sala) => (
                <div 
                  key={sala.id} 
                  className="card bg-slate-950/30 border border-slate-800/80 hover:border-indigo-500/40 hover:bg-slate-950/60 hover:-translate-y-0.5 transition-all duration-300 p-4 rounded-xl flex flex-col justify-between gap-4"
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-bold text-white text-base leading-snug">{sala.nombre}</h3>
                    <div className="flex flex-col gap-1 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <span className="text-slate-500 text-sm">📍</span> {sala.edificio} - {sala.piso}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="text-slate-500 text-sm">👥</span> Capacidad: {sala.capacidad} personas
                      </span>
                      {sala.equipamiento && (
                        <span className="flex items-center gap-1.5">
                          <span className="text-slate-500 text-sm">🛠️</span> {sala.equipamiento}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-900/60 pt-3">
                    <span className={`badge badge-sm font-semibold border-none text-white ${
                      sala.estado === 'disponible' ? 'bg-emerald-600/85' : 'bg-rose-600/85'
                    }`}>
                      {sala.estado}
                    </span>
                    {sala.estado === 'disponible' && (
                      <button
                        onClick={() => setSelectedSalaId(sala.id)}
                        className="btn btn-outline btn-primary btn-xs px-3 hover:scale-[1.03] transition-transform"
                      >
                        Seleccionar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
