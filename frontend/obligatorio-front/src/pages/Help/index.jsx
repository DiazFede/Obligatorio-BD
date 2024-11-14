import React from 'react';
import Card from '../../components/Card';
import styles from './index.module.css';
import HeaderHelp from '../../components/HeaderHelp';

const Help = () => {

    return (
        <>
            <HeaderHelp />
            <div className={styles.cardContainer}>
                <Card title="¿Por qué no puedo iniciar sesión?" content="Asegúrate de que tus credenciales sean correctas." />
                <Card title="¿Por qué no puedo anotarme a clase?" content="Revisa si hay clases disponibles." />
                <Card title="¿Por qué no puedo ver los turnos disponibles?" content="Verifica que hayas iniciado sesión correctamente." />
            </div>
        </>
    );
}

export default Help;