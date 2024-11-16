import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../apiservices/api";
import styles from './index.module.css';
import HeaderAdminLogin from "../../components/HeaderAdminLogin";

const AdminLogin = () => {
    const navigate = useNavigate();
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginAdmin(correo, contrasena);
            console.log("Admin login successful:", response);

            navigate("/admin");
        } catch (error) {
            console.error("Admin login failed:", error);
            setError("Error de inicio de sesión. Por favor verifica tus credenciales.");
        }
    };

    return (
        <>
            <HeaderAdminLogin />
            <div className={styles.loginForm}>
                <h2>Iniciar sesión como administrador</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <label className={styles.label}>Contraseña:</label>
                    <input
                        type="password"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        className={styles.input}
                        required
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>Iniciar sesión</button>
                </form>
            </div>
        </>
    );
};

export default AdminLogin;