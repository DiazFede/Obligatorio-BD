/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Equipamiento() {
    const [equipamiento, setEquipamiento] = useState([]);
    const [idActividad, setIdActividad] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [costo, setCosto] = useState('');

    useEffect(() => {
        fetchEquipamiento();
    }, []);

    const fetchEquipamiento = async () => {
        const response = await api.get('/equipamiento');
        setEquipamiento(response.data);
    };

    const handleAddEquipamiento = async () => {
        await api.post('/equipamiento', { id_actividad: idActividad, descripcion, costo });
        fetchEquipamiento();
        setIdActividad('');
        setDescripcion('');
        setCosto('');
    };

    return (
        <div>
            <h2>Equipamiento</h2>
            <input type="text" placeholder="ID Actividad" value={idActividad} onChange={(e) => setIdActividad(e.target.value)} />
            <input type="text" placeholder="Descripción" value={descripcion} onChange={(e) => setDescripcion(e.target.value)} />
            <input type="number" placeholder="Costo" value={costo} onChange={(e) => setCosto(e.target.value)} />
            <button onClick={handleAddEquipamiento}>Agregar Equipamiento</button>
            <ul>
                {equipamiento.map((item) => (
                    <li key={item.id}>{item.descripcion} - {item.costo}</li>
                ))}
            </ul>
        </div>
    );
}

export default Equipamiento;
