import React, { useState, useEffect } from "react";
import { getAlumnos } from "../../apiservices/api";
import styles from './index.module.css';

const MyAccount = () => {
    const [alumno, setAlumno] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchAlumnoData = async () => {
            try {
                const data = await getAlumnos();
                setAlumno(data[0]);
            } catch (error) {
                setError("Error al obtener los datos.");
            }
        };

        fetchAlumnoData();
    }, []);

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={styles.accountContainer}>
            {alumno ? (
                <div className={styles.accountDetails}>
                    <h1>Mis datos</h1>
                    <p><strong>Nombre:</strong> {alumno.nombre}</p>
                    <p><strong>Apellido:</strong> {alumno.apellido}</p>
                    <p><strong>CI:</strong> {alumno.ci}</p>
                    <p><strong>Email:</strong> {alumno.email}</p>
                    <p><strong>Fecha de Nacimiento:</strong> {alumno.fecha_nacimiento}</p>
                </div>
            ) : (
                <p>Cargando tus datos...</p>
            )}
        </div>
    );
};

export default MyAccount;