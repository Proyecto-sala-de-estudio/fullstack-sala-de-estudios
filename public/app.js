document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('curso-form');
    const inputNombre = document.getElementById('nombre');
    const inputInstructor = document.getElementById('instructor');
    const inputCreditos = document.getElementById('creditos');
    
    const errorNombre = document.getElementById('error-nombre');
    const errorInstructor = document.getElementById('error-instructor');
    const errorCreditos = document.getElementById('error-creditos');
    
    const btnSubmit = document.getElementById('btn-submit');
    const btnLoader = btnSubmit.querySelector('.btn-loader');
    const btnText = btnSubmit.querySelector('span');
    
    const loadingState = document.getElementById('loading-state');
    const emptyState = document.getElementById('empty-state');
    const cursosList = document.getElementById('cursos-list');
    const cursosCount = document.getElementById('cursos-count');
    const notification = document.getElementById('notification');

    let courses = [];
    let toastTimeout;

    // Cargar catálogo inicial
    cargarCursos();

    // Evento Submit de Inserción
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        resetFormErrors();

        let isValid = true;

        const nombreVal = inputNombre.value.trim();
        if (!nombreVal) {
            showFieldError(errorNombre, inputNombre, 'El nombre del curso no puede estar vacío.');
            isValid = false;
        }

        const instructorVal = inputInstructor.value.trim();
        if (!instructorVal) {
            showFieldError(errorInstructor, inputInstructor, 'El nombre del instructor no puede estar vacío.');
            isValid = false;
        }

        const creditosVal = inputCreditos.value.trim();
        if (!creditosVal) {
            showFieldError(errorCreditos, inputCreditos, 'Los créditos son obligatorios.');
            isValid = false;
        } else {
            const creditosNum = Number(creditosVal);
            if (isNaN(creditosNum) || !Number.isInteger(creditosNum) || creditosNum <= 0) {
                showFieldError(errorCreditos, inputCreditos, 'Los créditos deben ser un número entero positivo mayor que cero.');
                isValid = false;
            }
        }

        if (!isValid) return;

        // Mostrar indicador de carga en botón
        setSubmitLoading(true);

        try {
            const response = await fetch('/api/cursos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nombre: nombreVal,
                    instructor: instructorVal,
                    creditos: Number(creditosVal)
                })
            });

            const data = await response.json();

            if (!response.ok) {
                showToast(data.error || 'Error al guardar el curso.', 'danger');
            } else {
                showToast('¡Curso registrado exitosamente!', 'success');
                form.reset();
                courses.push(data);
                renderCourses();
            }
        } catch (err) {
            console.error('Error de red al crear curso:', err);
            showToast('No se pudo conectar con el servidor. Revisa tu conexión a internet o el estado de la API.', 'danger');
        } finally {
            setSubmitLoading(false);
        }
    });

    // Carga de catálogo de base de datos
    async function cargarCursos() {
        showElement(loadingState);
        hideElement(emptyState);
        cursosList.innerHTML = '';

        try {
            const response = await fetch('/api/cursos');
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            courses = await response.json();
            renderCourses();
        } catch (err) {
            console.error('Error al cargar cursos:', err);
            hideElement(loadingState);
            showToast('Error al conectar con el servidor para cargar el catálogo.', 'danger');
            
            // Renderizar botón de reintento en el bloque de listado
            cursosList.className = "col-span-full";
            cursosList.innerHTML = `
                <div class="flex flex-col items-center justify-center text-center gap-4 py-16">
                    <span class="text-4xl text-rose-500">⚠️</span>
                    <h3 class="text-base font-semibold text-slate-200">Error al cargar los cursos</h3>
                    <p class="text-slate-500 text-xs max-w-xs">No fue posible conectarse con la API. Verifica que esté en ejecución.</p>
                    <button id="btn-retry" class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold py-2 px-6 rounded-lg transition-all shadow-lg">
                        Intentar de Nuevo
                    </button>
                </div>
            `;

            document.getElementById('btn-retry')?.addEventListener('click', () => {
                cursosList.className = "grid grid-cols-1 md:grid-cols-2 gap-4";
                cargarCursos();
            });
        }
    }

    // Renderizado en DOM con clases Tailwind CSS
    function renderCourses() {
        hideElement(loadingState);
        cursosList.innerHTML = '';
        cursosCount.textContent = courses.length;

        if (courses.length === 0) {
            showElement(emptyState);
            return;
        }

        hideElement(emptyState);

        courses.forEach(curso => {
            const card = document.createElement('div');
            card.className = 'bg-slate-950/40 border border-slate-800/80 rounded-xl p-4 flex flex-col justify-between gap-4 hover:border-indigo-500/50 hover:bg-slate-950/70 transition-all group relative overflow-hidden animate-scale-in';
            card.innerHTML = `
                <div class="space-y-1">
                    <h3 class="font-bold text-white group-hover:text-indigo-400 transition-colors text-sm sm:text-base leading-snug">
                        ${escapeHTML(curso.nombre)}
                    </h3>
                    <p class="text-slate-400 text-xs sm:text-sm flex items-center gap-1.5">
                        <span class="text-slate-500 text-[11px]">👤</span> ${escapeHTML(curso.instructor)}
                    </p>
                </div>
                <div class="flex items-center justify-between border-t border-slate-800/50 pt-3">
                    <span class="bg-slate-900 border border-slate-800 text-indigo-400 font-semibold text-[11px] py-0.5 px-2.5 rounded-md">
                        ${curso.creditos} CR
                    </span>
                    <span class="text-[10px] font-mono text-slate-500">
                        ID: ${curso.id}
                    </span>
                </div>
            `;
            cursosList.appendChild(card);
        });
    }

    // Mostrar errores de campos en pantalla
    function showFieldError(errorEl, inputEl, message) {
        errorEl.textContent = message;
        inputEl.classList.add('input-invalid');
    }

    function resetFormErrors() {
        [errorNombre, errorInstructor, errorCreditos].forEach(el => el.textContent = '');
        [inputNombre, inputInstructor, inputCreditos].forEach(input => {
            input.classList.remove('input-invalid');
        });
    }

    // Configuración de botón cargando
    function setSubmitLoading(isLoading) {
        if (isLoading) {
            btnSubmit.disabled = true;
            showElement(btnLoader);
            btnText.textContent = 'Registrando...';
        } else {
            btnSubmit.disabled = false;
            hideElement(btnLoader);
            btnText.textContent = 'Registrar Curso';
        }
    }

    // Mostrar Notificaciones Toast con Tailwind CSS
    function showToast(message, type = 'success') {
        clearTimeout(toastTimeout);
        
        const isSuccess = type === 'success';
        const bgColor = isSuccess ? 'bg-emerald-950/90' : 'bg-rose-950/90';
        const borderColor = isSuccess ? 'border-emerald-500/50' : 'border-rose-500/50';
        const textColor = isSuccess ? 'text-emerald-400' : 'text-rose-400';
        const icon = isSuccess ? '✅' : '⚠️';

        notification.innerHTML = `
            <div class="flex items-center gap-3 py-3.5 px-4 rounded-xl shadow-2xl border ${bgColor} ${borderColor} ${textColor} backdrop-blur-md">
                <span class="text-lg">${icon}</span>
                <p class="text-sm font-semibold">${message}</p>
            </div>
        `;
        
        notification.classList.add('toast-visible');

        toastTimeout = setTimeout(() => {
            notification.classList.remove('toast-visible');
        }, 5000);
    }

    // DOM Utilities
    function showElement(el) {
        el.classList.remove('hidden');
    }

    function hideElement(el) {
        el.classList.add('hidden');
    }

    function escapeHTML(str) {
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    }
});
