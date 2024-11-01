const BASE_URL = 'http://127.0.0.1:5000'; 

// Generic function for making requests
const apiRequest = async (url, method, body) => {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : null,
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Error: ${response.statusText}. Details: ${errorData.message}`);
        }
        return response.json();
    } catch (error) {
        console.error("API Request Error:", error);
        throw error; // Rethrow the error after logging
    }
};

// Methods for managing students
export const getAlumnos = () => apiRequest(`${BASE_URL}/alumnos`, 'GET');
export const createAlumno = (alumno) => apiRequest(`${BASE_URL}/alumnos`, 'POST', alumno);
export const updateAlumno = (ci, alumno) => apiRequest(`${BASE_URL}/alumnos/${ci}`, 'PUT', alumno);
export const deleteAlumno = (ci) => apiRequest(`${BASE_URL}/alumnos/${ci}`, 'DELETE');

// Methods for managing instructors
export const getInstructores = () => apiRequest(`${BASE_URL}/instructores`, 'GET');
export const createInstructor = (instructor) => apiRequest(`${BASE_URL}/instructores`, 'POST', instructor);
export const updateInstructor = (ci, instructor) => apiRequest(`${BASE_URL}/instructores/${ci}`, 'PUT', instructor);
export const deleteInstructor = (ci) => apiRequest(`${BASE_URL}/instructores/${ci}`, 'DELETE');

// Methods for managing activities
export const getActividades = () => apiRequest(`${BASE_URL}/actividades`, 'GET');
export const createActividad = (actividad) => apiRequest(`${BASE_URL}/actividades`, 'POST', actividad);
export const updateActividad = (id, actividad) => apiRequest(`${BASE_URL}/actividades/${id}`, 'PUT', actividad);
export const deleteActividad = (id) => apiRequest(`${BASE_URL}/actividades/${id}`, 'DELETE');

// Methods for managing equipment
export const getEquipamiento = () => apiRequest(`${BASE_URL}/equipamiento`, 'GET');
export const createEquipamiento = (equipamiento) => apiRequest(`${BASE_URL}/equipamiento`, 'POST', equipamiento);
export const updateEquipamiento = (id, equipamiento) => apiRequest(`${BASE_URL}/equipamiento/${id}`, 'PUT', equipamiento);
export const deleteEquipamiento = (id) => apiRequest(`${BASE_URL}/equipamiento/${id}`, 'DELETE');

// Methods for managing shifts
export const getTurnos = () => apiRequest(`${BASE_URL}/turnos`, 'GET');
export const createTurno = (turno) => apiRequest(`${BASE_URL}/turnos`, 'POST', turno);
export const updateTurno = (id, turno) => apiRequest(`${BASE_URL}/turnos/${id}`, 'PUT', turno);
export const deleteTurno = (id) => apiRequest(`${BASE_URL}/turnos/${id}`, 'DELETE');

// Methods for managing classes
export const getClases = () => apiRequest(`${BASE_URL}/clases`, 'GET');
export const createClase = (clase) => apiRequest(`${BASE_URL}/clases`, 'POST', clase);
export const updateClase = (id, clase) => apiRequest(`${BASE_URL}/clases/${id}`, 'PUT', clase);
export const deleteClase = (id) => apiRequest(`${BASE_URL}/clases/${id}`, 'DELETE');

// Methods for managing student-class relationships
export const getAlumnoClase = () => apiRequest(`${BASE_URL}/alumno_clase`, 'GET');
export const createAlumnoClase = (alumnoClase) => apiRequest(`${BASE_URL}/alumno_clase`, 'POST', alumnoClase);
export const deleteAlumnoClase = (idClase, ciAlumno) => apiRequest(`${BASE_URL}/alumno_clase`, 'DELETE', { id_clase: idClase, ci_alumno: ciAlumno });

export const loginUser = async (correo, contrasena) => {
    const response = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ correo, contrasena }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Login failed: ${errorData.message}`);
    }
    return response.json();
};
