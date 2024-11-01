
const BASE_URL = 'http://127.0.0.1:5000'; 

// Función genérica para realizar peticiones
const apiRequest = async (url, method, body) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
};

// Métodos para manejar alumnos
export const getAlumnos = () => apiRequest(`${BASE_URL}/alumnos`, 'GET');
export const createAlumno = (alumno) => apiRequest(`${BASE_URL}/alumnos`, 'POST', alumno);
export const updateAlumno = (ci, alumno) => apiRequest(`${BASE_URL}/alumnos/${ci}`, 'PUT', alumno);
export const deleteAlumno = (ci) => apiRequest(`${BASE_URL}/alumnos/${ci}`, 'DELETE');

// Métodos para manejar instructores
export const getInstructores = () => apiRequest(`${BASE_URL}/instructores`, 'GET');
export const createInstructor = (instructor) => apiRequest(`${BASE_URL}/instructores`, 'POST', instructor);
export const updateInstructor = (ci, instructor) => apiRequest(`${BASE_URL}/instructores/${ci}`, 'PUT', instructor);
export const deleteInstructor = (ci) => apiRequest(`${BASE_URL}/instructores/${ci}`, 'DELETE');

// Métodos para manejar actividades
export const getActividades = () => apiRequest(`${BASE_URL}/actividades`, 'GET');
export const createActividad = (actividad) => apiRequest(`${BASE_URL}/actividades`, 'POST', actividad);
export const updateActividad = (id, actividad) => apiRequest(`${BASE_URL}/actividades/${id}`, 'PUT', actividad);
export const deleteActividad = (id) => apiRequest(`${BASE_URL}/actividades/${id}`, 'DELETE');

// Métodos para manejar equipamiento
export const getEquipamiento = () => apiRequest(`${BASE_URL}/equipamiento`, 'GET');
export const createEquipamiento = (equipamiento) => apiRequest(`${BASE_URL}/equipamiento`, 'POST', equipamiento);
export const updateEquipamiento = (id, equipamiento) => apiRequest(`${BASE_URL}/equipamiento/${id}`, 'PUT', equipamiento);
export const deleteEquipamiento = (id) => apiRequest(`${BASE_URL}/equipamiento/${id}`, 'DELETE');

// Métodos para manejar turnos
export const getTurnos = () => apiRequest(`${BASE_URL}/turnos`, 'GET');
export const createTurno = (turno) => apiRequest(`${BASE_URL}/turnos`, 'POST', turno);
export const updateTurno = (id, turno) => apiRequest(`${BASE_URL}/turnos/${id}`, 'PUT', turno);
export const deleteTurno = (id) => apiRequest(`${BASE_URL}/turnos/${id}`, 'DELETE');

// Métodos para manejar clases
export const getClases = () => apiRequest(`${BASE_URL}/clases`, 'GET');
export const createClase = (clase) => apiRequest(`${BASE_URL}/clases`, 'POST', clase);
export const updateClase = (id, clase) => apiRequest(`${BASE_URL}/clases/${id}`, 'PUT', clase);
export const deleteClase = (id) => apiRequest(`${BASE_URL}/clases/${id}`, 'DELETE');

// Métodos para manejar alumno_clase
export const getAlumnoClase = () => apiRequest(`${BASE_URL}/alumno_clase`, 'GET');
export const createAlumnoClase = (alumnoClase) => apiRequest(`${BASE_URL}/alumno_clase`, 'POST', alumnoClase);
export const deleteAlumnoClase = (idClase, ciAlumno) => apiRequest(`${BASE_URL}/alumno_clase`, 'DELETE', { id_clase: idClase, ci_alumno: ciAlumno });
