import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
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

  const handleBackClick = () => {
    navigate('/home');
  }

  return (
    <>
      <button onClick={handleBackClick} className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white' }} />
      </button>
      
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
    </>
  );
};

export default MyAccount;