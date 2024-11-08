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
        throw error;
    }
};

// Methods for managing students
export const getAlumnos = () => apiRequest(`${BASE_URL}/alumnos`, 'GET');

// Actualización de createAlumno para incluir los campos adicionales de la tabla `alumnos`
export const createAlumno = (alumno) => {
    // Formato de fecha que el backend espera (DD-MM-YYYY)
    if (alumno.fecha_nacimiento instanceof Date) {
        const day = String(alumno.fecha_nacimiento.getDate()).padStart(2, '0');
        const month = String(alumno.fecha_nacimiento.getMonth() + 1).padStart(2, '0');
        const year = alumno.fecha_nacimiento.getFullYear();
        alumno.fecha_nacimiento = `${day}-${month}-${year}`;
    }
    return apiRequest(`${BASE_URL}/register`, 'POST', alumno);
};

export const updateAlumno = (ci, alumno) => apiRequest(`${BASE_URL}/alumnos/${ci}`, 'PUT', alumno);
export const deleteAlumno = (ci) => apiRequest(`${BASE_URL}/alumnos/${ci}`, 'DELETE');
export const getAlumnoByCi = (ci) => apiRequest(`${BASE_URL}/alumnos/${ci}`, 'GET');

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
export const getClases = () => apiRequest(`${BASE_URL}/clase`, 'GET');
export const createClase = (clase) => apiRequest(`${BASE_URL}/clase`, 'POST', clase);
export const updateClase = (id, clase) => apiRequest(`${BASE_URL}/clase/${id}`, 'PUT', clase);
export const deleteClase = (id) => apiRequest(`${BASE_URL}/clase/${id}`, 'DELETE');

// Methods for managing student-class relationships
export const getAlumnoClase = () => apiRequest(`${BASE_URL}/alumno_clase`, 'GET');
export const createAlumnoClase = (alumnoClase) => apiRequest(`${BASE_URL}/alumno_clase`, 'POST', alumnoClase);
export const deleteAlumnoClase = (idClase, ciAlumno) => apiRequest(`${BASE_URL}/alumno_clase/${idClase}/${ciAlumno}`, 'DELETE');

// Login
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

    // Guardar el CI del usuario en localStorage antes de devolver la respuesta
    const data = await response.json();
    localStorage.setItem("userCi", data.ci); // Asegúrate de que el campo 'ci' esté presente en la respuesta

    return data; // Retornar la respuesta con los datos del usuario
};

// Reports
export const reportIngresosActividades = () => apiRequest(`${BASE_URL}/report/ingresos_actividades`, 'GET');
export const reportAlumnosActividades = () => apiRequest(`${BASE_URL}/report/alumnos_actividades`, 'GET');
export const reportTurnosClases = () => apiRequest(`${BASE_URL}/report/turnos_clases`, 'GET');

// Verificación de disponibilidad de clases
export const verifyClassAvailability = (data) => apiRequest(`${BASE_URL}/verify_class_availability`, 'POST', data);

// Gestión de alquiler de equipamiento
export const rentEquipmentToAlumno = (idEquipamiento, ciAlumno) => apiRequest(`${BASE_URL}/alumno_clase/rent`, 'POST', { idEquipamiento, ciAlumno });
export const releaseEquipmentFromAlumno = (idEquipamiento, ciAlumno) => apiRequest(`${BASE_URL}/alumno_clase/release`, 'POST', { idEquipamiento, ciAlumno });
