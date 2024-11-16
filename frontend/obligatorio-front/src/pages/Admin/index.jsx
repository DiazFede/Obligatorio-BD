import React from "react";
import styles from './index.module.css';
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faUserGraduate, faHome } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {

    const navigate = useNavigate();

    const handleUserClick = () => {
        navigate('/adminalumnos')
    }

    const handleInstructorClick = () => {
        navigate('/admininstructores')
    }

    const handleHomeClick = () => {
        navigate('/')
    }

    return (
        <>
            <div className={styles.homeContainer}>
                <button onClick={handleHomeClick} className={styles.homeButton}>
                    <FontAwesomeIcon icon={faHome} style={{ color: 'white' }} />
                </button>
            </div>
            <div className={styles.generalContainer}>
                <h2 className={styles.title}>¿Qué desea administrar?</h2>
                <div className={styles.buttonsContainer}>
                    <button onClick={handleUserClick} className={styles.button}>
                        <FontAwesomeIcon icon={faUser} style={{ color: '#333' }} /> Alumnos
                    </button>

                    <button onClick={handleInstructorClick} className={styles.button}>
                        <FontAwesomeIcon icon={faUserGraduate} style={{ color: '#333' }} /> Instructores
                    </button>
                </div>
            </div>
        </>
    );
};

export default Admin;