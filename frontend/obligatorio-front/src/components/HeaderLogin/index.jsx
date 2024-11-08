import React from 'react';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';

const HeaderLogin = () => {
  return (
    <div className={styles.header}>
      <button onClick={() => (window.location.href = `/home`)} className={styles.homeButton}>
        <FontAwesomeIcon icon={faHouse} style={{ color: 'white' }} />
      </button>
      <h2 className={styles.title}>UCU - Escuela de deportes de invierno</h2>
      <button onClick={() => (window.location.href = `/help`)} className={styles.helpButton}>
        <FontAwesomeIcon icon={faCircleQuestion} style={{ color: 'white' }} />
      </button>
    </div>
  );
};

export default HeaderLogin;