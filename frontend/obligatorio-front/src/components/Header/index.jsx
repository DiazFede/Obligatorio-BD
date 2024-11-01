import React from 'react';
import styles from './index.module.css';
import Button from '../Button';

const Header = ({ openModal }) => {
  return (
    <div className={styles.header}>
        <Button onClick={() => {
          window.location.href = `/login`
        }}>Iniciar sesion</Button>
        <h2 className={styles.title}>UCU - Escuela de deportes de invierno</h2>
        <Button onClick={openModal}>Nueva clase</Button>
    </div>
  );
};

export default Header;