import React from "react";
import styles from './index.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const HeaderAdminAlumnos = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/admin');
    };

    return (
        <div className={styles.header}>
            <button onClick={handleHomeClick} className={styles.homeButton}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white' }} />
            </button>

            <h2 className={styles.title}>Administrador de alumnos</h2>

            <button className={styles.hiddenButton}>
                <FontAwesomeIcon icon={faArrowLeft} style={{ color: 'white' }} />
            </button>
        </div>
    );
}

export default HeaderAdminAlumnos;