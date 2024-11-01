import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/Card';
import styles from './index.module.css';
import HeaderHelp from '../../components/HeaderHelp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Help = () => {
    const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/');
    };

    return (
        <>
            <HeaderHelp />
            <div className={styles.cardContainer}>
                <Card title="¿Por qué no puedo iniciar sesión?" content="Asegúrate de que tus credenciales sean correctas." />
                <Card title="¿Por qué no puedo anotarme a clase?" content="Revisa si hay clases disponibles." />
                <Card title="¿Por qué no puedo ver los turnos disponibles?" content="Verifica que hayas iniciado sesión correctamente." />
            </div>
            <button onClick={handleHomeClick} className={styles.homeButton}>
                <FontAwesomeIcon icon={faHouse} style={{ color: 'white' }} />
            </button>
        </>
    );
}

export default Help;