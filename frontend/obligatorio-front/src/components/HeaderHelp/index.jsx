import React from 'react';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HeaderHelp = () => {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/home');
  };

  return (
    <div className={styles.header}>
      <button onClick={handleHomeClick} className={styles.homeButton}>
        <FontAwesomeIcon icon={faHouse} style={{ color: 'white' }} />
      </button>

      <h2 className={styles.title}>Preguntas frecuentes</h2>

      <button className={styles.hiddenButton}>
        <FontAwesomeIcon icon={faHouse} style={{ color: 'white' }} />
      </button>
    </div>
  );
};

export default HeaderHelp;