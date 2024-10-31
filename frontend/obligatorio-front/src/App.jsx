/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Alumnos from './components/Alumnos/Alumnos';
import Actividades from './components/Actividades/Actividades';
import Equipamiento from './components/Equipamiento/Equipamiento';
import Instructores from './components/Instructores/Instructores';
import Turnos from './components/Turnos/Turnos';
import Reportes from './components/Reportes/Reportes';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/alumnos" element={<Alumnos />} />
                <Route path="/actividades" element={<Actividades />} />
                <Route path="/equipamiento" element={<Equipamiento />} />
                <Route path="/instructores" element={<Instructores />} />
                <Route path="/turnos" element={<Turnos />} />
                <Route path="/reportes" element={<Reportes />} />
            </Routes>
        </Router>
    );
}

export default App;
