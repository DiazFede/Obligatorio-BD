import React, {useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../../apiservices/api";
import styles from './index.module.css';
import HeaderAdminLogin from "../../components/HeaderAdminLogin";

const AdminLogin = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginUser(email, password);
            console.log("Login successful:", response);

            navigate("/admin");
        } catch (error) {
            console.error("Login failed:", error);
            setError("Error de inicio de sesión. Por favor verifica tus credenciales.");
        }
    };

    return (
        <>
            <HeaderAdminLogin />
            <div className={styles.loginForm}>
                <h2>Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.label}>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />
                    <label className={styles.label}>Contraseña:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" className={styles.button}>Iniciar sesión</button>
                </form>
            </div>
        </>
    );
}

export default AdminLogin;