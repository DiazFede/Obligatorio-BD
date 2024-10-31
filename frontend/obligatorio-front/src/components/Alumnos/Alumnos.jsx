/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Alumnos() {
    const [alumnos, setAlumnos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [ci, setCi] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');

    useEffect(() => {
        api.get('/alumnos').then((response) => {
            setAlumnos(response.data);
        });
    }, []);

    const handleAddAlumno = async () => {
        try {
            await api.post('/alumnos', { nombre, apellido, ci, fechaNacimiento });
            alert("Alumno agregado exitosamente");
        } catch (error) {
            alert("Error al agregar alumno");
        }
    };

    return (
        <div>
            <h2>Gestión de Alumnos</h2>
            <input type="text" placeholder="CI" value={ci} onChange={(e) => setCi(e.target.value)} />
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <input type="date" placeholder="Fecha de Nacimiento" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
            <button onClick={handleAddAlumno}>Agregar Alumno</button>

            <ul>
                {alumnos.map((alumno) => (
                    <li key={alumno.ci}>{alumno.nombre} {alumno.apellido}</li>
                ))}
            </ul>
        </div>
    );
}

export default Alumnos;
