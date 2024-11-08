import React from 'react';
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlus } from '@fortawesome/free-solid-svg-icons';

const Header = ({ openModal }) => {
  return (
    <div className={styles.header}>
        <button onClick={() => {
          window.location.href = `/myaccount`;
        }} className={styles.iconButton}>
          <FontAwesomeIcon icon={faUser} />
        </button>
        
        <h2 className={styles.title}>UCU - Escuela de deportes de invierno</h2>
        
        <button onClick={openModal} className={styles.iconButton}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
    </div>
  );
};

export default Header;
