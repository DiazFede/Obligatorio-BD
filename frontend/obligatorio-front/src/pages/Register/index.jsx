// src/pages/Register.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../apiservices/api";
import Modal from "../../components/Modal"; // Asegúrate de importar el modal
import styles from './index.module.css';

const Register = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setModalOpen(false); // Cerrar el modal antes de enviar el registro

    try {
      // Perform registration request
      const response = await registerUser(nombre, email, password);
      console.log("Registration successful:", response);
      setModalMessage("Registro exitoso. Puedes iniciar sesión."); // Mensaje de éxito
      setModalOpen(true); // Abrir el modal
    } catch (error) {
      console.error("Registration failed:", error);
      setModalMessage("Error al registrarse. Por favor verifica tus datos."); // Mensaje de error
      setModalOpen(true); // Abrir el modal
    }
  };

  return (
    <div className={styles.registerForm}>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className={styles.input}
          required
        />
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
        <div className={styles.buttonContainer}> {/* Contenedor para centrar el botón */}
          <button type="submit" className={styles.button}>Registrarse</button>
        </div>
      </form>
      
      {/* Modal para mostrar mensajes */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2>{modalMessage}</h2>
        <button onClick={() => {
          setModalOpen(false);
          navigate("/login"); // Redirigir a login después de cerrar el modal en caso de éxito
        }}>
          Cerrar
        </button>
      </Modal>
    </div>
  );

};

export default Register;