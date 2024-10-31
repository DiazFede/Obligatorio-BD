/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import api from '../services/api';

function Turnos() {
    const [turnos, setTurnos] = useState([]);
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');

    useEffect(() => {
        fetchTurnos();
    }, []);

    const fetchTurnos = async () => {
        const response = await api.get('/turnos');
        setTurnos(response.data);
    };

    const handleAddTurno = async () => {
        await api.post('/turnos', { hora_inicio: horaInicio, hora_fin: horaFin });
        fetchTurnos();
        setHoraInicio('');
        setHoraFin('');
    };

    return (
        <div>
            <h2>Turnos</h2>
            <input type="text" placeholder="Hora Inicio (HH:MM)" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
            <input type="text" placeholder="Hora Fin (HH:MM)" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
            <button onClick={handleAddTurno}>Agregar Turno</button>
            <ul>
                {turnos.map((turno) => (
                    <li key={turno.id}>{turno.hora_inicio} - {turno.hora_fin}</li>
                ))}
            </ul>
        </div>
    );
}

export default Turnos
