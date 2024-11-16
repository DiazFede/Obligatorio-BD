import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import styles from './index.module.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();
  console.log(user)

  useEffect(() => {
    if (!user) {
      navigate("/");
    }

    }, [navigate, user]);

  return (
    <div className={styles.accountContainer}>
      {user ? (
        <div className={styles.accountDetails}>
          <h2>Mis Datos</h2>
          <p><strong>Nombre:</strong> {user.nombre}</p>
          <p><strong>Apellido:</strong> {user.apellido}</p>
          <p><strong>Email:</strong> {user.correo_electronico}</p>
          <p><strong>Fecha de Nacimiento:</strong> {user.fecha_nacimiento}</p>
        </div>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default MyAccount;