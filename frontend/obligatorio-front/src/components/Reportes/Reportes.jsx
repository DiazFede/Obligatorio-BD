/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import api from '../services/api';

function Reportes() {
    const [ingresos, setIngresos] = useState([]);
    const [alumnosPorActividad, setAlumnosPorActividad] = useState([]);

    useEffect(() => {
        api.get('/reportes/ingresos_actividades').then((response) => setIngresos(response.data));
        api.get('/reportes/alumnos_por_actividad').then((response) => setAlumnosPorActividad(response.data));
    }, []);

    return (
        <div>
            <h2>Reportes</h2>
            <h3>Ingresos por Actividad</h3>
            <ul>{ingresos.map((r) => <li key={r.descripcion}>{r.descripcion}: {r.ingresos}</li>)}</ul>
            <h3>Alumnos por Actividad</h3>
            <ul>{alumnosPorActividad.map((a) => <li key={a.descripcion}>{a.descripcion}: {a.total_alumnos}</li>)}</ul>
        </div>
    );
}

export default Reportes;
