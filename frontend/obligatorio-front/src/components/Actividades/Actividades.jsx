/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Actividades() {
    const [actividades, setActividades] = useState([]);
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');

    useEffect(() => {
        fetchActividades();
    }, []);

    const fetchActividades = async () => {
        const response = await api.get('/actividades');
        setActividades(response.data);
    };

    const handleAddActividad = async () => {
        await api.post('/actividades', { descripcion, costo });
        fetchActividades();
        setDescripcion('');
        setCosto('');
    };

    return (
        <div>
            <h2>Actividades</h2>
            <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <input type="number" placeholder="Costo" value={costo} onChange={(e) => setCosto(e.target.value)} />
            <button onClick={handleAddActividad}>Agregar Actividad</button>
            <ul>
                {actividades.map((actividad) => (
                    <li key={actividad.id}>{actividad.descripcion} - {actividad.costo}</li>
                ))}
            </ul>
        </div>
    );
}

export default Actividades;
