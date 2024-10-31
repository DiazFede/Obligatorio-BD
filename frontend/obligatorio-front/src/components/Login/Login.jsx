/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import api from '../services/api';

function Login() {
    const [correo, setCorreo] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', { correo, contrasena });
            alert(response.data.message);
        } catch (error) {
            alert("Correo o contraseña incorrectos");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="email" placeholder="Correo" value={correo} onChange={(e) => setCorreo(e.target.value)} />
            <input type="password" placeholder="Contraseña" value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
            <button type="submit">Iniciar sesión</button>
        </form>
    );
}

export default Login;
