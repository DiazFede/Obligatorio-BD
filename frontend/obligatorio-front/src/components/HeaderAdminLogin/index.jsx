import React from 'react';
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const HeaderAdminLogin = () => {

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/');
  }

  return (
    <div className={styles.header}>
      <button onClick={handleBackClick} className={styles.backButton}>
        <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white' }} />
      </button>

      <h2 className={styles.title}>UCU - Escuela de deportes de invierno</h2>
      
      <button className={styles.helpButton}>
        <FontAwesomeIcon icon={faCircleQuestion} />
      </button>
    </div>
  );
};

export default HeaderAdminLogin;