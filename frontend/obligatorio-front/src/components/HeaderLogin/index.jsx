import React from 'react';
import styles from './index.module.css';
import Button from '../Button';

const HeaderLogin = () => {
  return (
    <div className={styles.header}>
      <Button onClick={() => (window.location.href = `/`)}>🏠</Button>
      <h2 className={styles.title}>UCU - Escuela de deportes de invierno</h2>
    </div>
  );
};

export default HeaderLogin;