import React, { useEffect, useState } from "react";
import { getAlumnos, updateAlumno, deleteAlumno } from "../../apiservices/api";
import HeaderAdminAlumnos from "../../components/HeaderAdminAlumnos";
import CardAdmin from "../../components/CardAdmin";
import styles from './index.module.css';

const AdminAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [form, setForm] = useState({ nombre: "", apellido: "", ci: "", fecha_nacimiento: "", email: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAlumno, setSelectedAlumno] = useState(null);

    useEffect(() => {
        loadAlumnos();
    }, []);

    const loadAlumnos = async () => {
        try {
            const data = await getAlumnos();
            setAlumnos(data);
        } catch (error) {
            console.error("Error al obtener alumnos:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateAlumno(selectedAlumno.ci, form);
            loadAlumnos();
            setForm({ nombre: "", apellido: "", ci: "", fecha_nacimiento: "", email: "" });
            setIsEditing(false);
            setSelectedAlumno(null);
        }
    };

    const handleEdit = (alumno) => {
        setForm({
            ...alumno,
            fecha_nacimiento: new Date(alumno.fecha_nacimiento).toISOString().split("T")[0], // Formato YYYY-MM-DD
        });
        setIsEditing(true);
        setSelectedAlumno(alumno);
    };

    const handleDelete = async (ci) => {
        await deleteAlumno(ci);
        loadAlumnos();
    };

    return (
        <>
            <HeaderAdminAlumnos />
            <div className={styles.cardContainer}>
                {alumnos.map((alumno) => (
                    <CardAdmin
                        key={alumno.ci}
                        title={alumno.nombre + " " + alumno.apellido}
                        content={
                            <>
                                <p>Cédula: {alumno.ci}</p>
                                <p>Fecha de Nacimiento: {alumno.fecha_nacimiento}</p>
                                <p>Email: {alumno.email}</p>
                                <button onClick={() => handleEdit(alumno)} className={styles.editButton}>Editar</button>
                                <button onClick={() => handleDelete(alumno.ci)} className={styles.deleteButton}>Eliminar</button>
                            </>
                        }
                    />
                ))}
            </div>

            {isEditing && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleInputChange}
                        placeholder="Apellido"
                        required
                    />
                    <input
                        type="date"
                        name="fecha_nacimiento"
                        value={form.fecha_nacimiento}
                        onChange={handleInputChange}
                        placeholder="Fecha de Nacimiento"
                        required
                        disabled={isEditing}
                    />
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="Email"
                        required
                    />
                    <button type="submit" className={styles.button}>Actualizar</button>
                </form>
            )}
        </>
    );
};

export default AdminAlumnos;