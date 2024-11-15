import React, { useState, useEffect } from "react";
import { getAlumnoByCi } from "../../apiservices/api"; 
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import styles from './index.module.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchUserData = async () => {
      try {
        const data = await getAlumnoByCi(user.ci);  // Obtiene el CI desde el contexto
        console.log(data);
        setUserData(data);
      } catch (error) {
        setError("Error al cargar los datos del usuario.");
        console.error(error);
      }
    };

    fetchUserData();
  }, [navigate, user]);

  return (
    <div className={styles.accountContainer}>
      {error && <p className={styles.error}>{error}</p>}
      {userData ? (
        <div className={styles.accountDetails}>
          <h2>Mis Datos</h2>
          <p><strong>Nombre:</strong> {userData.nombre}</p>
          <p><strong>Apellido:</strong> {userData.apellido}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Fecha de Nacimiento:</strong> {userData.fecha_nacimiento}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default MyAccount;