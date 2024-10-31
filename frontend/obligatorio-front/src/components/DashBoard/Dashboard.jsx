/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Panel de Administración</h1>
            <Link to="/alumnos">Alumnos</Link>
            <Link to="/actividades">Actividades</Link>
            <Link to="/instructores">Instructores</Link>
            <Link to="/equipamiento">Equipamiento</Link>
            <Link to="/turnos">Turnos</Link>
            <Link to="/reportes">Reportes</Link>
        </div>
    );
}

export default Dashboard;
