/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Instructores() {
    const [instructores, setInstructores] = useState([]);
    const [ci, setCi] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');

    useEffect(() => {
        fetchInstructores();
    }, []);

    const fetchInstructores = async () => {
        const response = await api.get('/instructores');
        setInstructores(response.data);
    };

    const handleAddInstructor = async () => {
        await api.post('/instructores', { ci, nombre, apellido });
        fetchInstructores();
        setCi('');
        setNombre('');
        setApellido('');
    };

    return (
        <div>
            <h2>Instructores</h2>
            <input type="text" placeholder="CI" value={ci} onChange={(e) => setCi(e.target.value)} />
            <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
            <button onClick={handleAddInstructor}>Agregar Instructor</button>
            <ul>
                {instructores.map((instructor) => (
                    <li key={instructor.ci}>{instructor.nombre} {instructor.apellido}</li>
                ))}
            </ul>
        </div>
    );
}

export default Instructores;
