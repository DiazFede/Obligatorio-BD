import React from 'react';
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const HeaderLogin = () => {

  const navigate = useNavigate();

  const handleAdminClick = () => {
    navigate('/adminlogin');
  }
  
  const handleHelpClick = () => {
    navigate('/help');
  }

  return (
    <div className={styles.header}>
      <button onClick={handleAdminClick} className={styles.adminButton}>
        <FontAwesomeIcon icon={faUserTie} style={{ color: 'white' }} />
      </button>

      <h2 className={styles.title}>UCU - Escuela de deportes de invierno</h2>
      
      <button onClick={handleHelpClick} className={styles.helpButton}>
        <FontAwesomeIcon icon={faCircleQuestion} style={{ color: 'white' }} />
      </button>
    </div>
  );
};

export default HeaderLogin;