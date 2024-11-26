import React, { useEffect, useState } from "react";
import { getAlumnos, updateAlumno, deleteAlumno } from "../../apiservices/api";
import HeaderAdminAlumnos from "../../components/HeaderAdminAlumnos";
import SearchBar from "../../components/SearchBar";
import CardAdmin from "../../components/CardAdmin";
import styles from './index.module.css';

const AdminAlumnos = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [filteredAlumnos, setFilteredAlumnos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [form, setForm] = useState({ nombre: "", apellido: "", ci: "", fecha_nacimiento: "", correo_electronico: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedAlumno, setSelectedAlumno] = useState(null);

    useEffect(() => {
        loadAlumnos();
    }, []);

    const loadAlumnos = async () => {
        try {
            const data = await getAlumnos();
            setAlumnos(data);
            setFilteredAlumnos(data);
        } catch (error) {
            console.error("Error al obtener alumnos:", error);
        }
    };

    const handleSearchChange = (term) => {
        setSearchTerm(term);
        const lowercasedTerm = term.toLowerCase();
        setFilteredAlumnos(
            alumnos.filter((alumno) =>
                alumno.nombre.toLowerCase().includes(lowercasedTerm)
            )
        );
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
            setForm({ nombre: "", apellido: "", ci: "", fecha_nacimiento: "", correo_electronico: "" });
            setIsEditing(false);
            setSelectedAlumno(null);
        }
    };

    const handleEdit = (alumno) => {
        setForm({
            ...alumno,
            fecha_nacimiento: new Date(alumno.fecha_nacimiento).toISOString().split("T")[0],
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
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            <div className={styles.cardContainer}>
                {filteredAlumnos.map((alumno) => (
                    <CardAdmin
                        key={alumno.ci}
                        title={alumno.nombre + " " + alumno.apellido}
                        content={
                            <>
                                <p>Cédula: {alumno.ci}</p>
                                <p>Fecha de Nacimiento: {alumno.fecha_nacimiento}</p>
                                <p>Email: {alumno.correo_electronico}</p>
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
                        className={styles.input}
                        type="text"
                        name="nombre"
                        value={form.nombre}
                        onChange={handleInputChange}
                        placeholder="Nombre"
                        required
                    />
                    <input
                        className={styles.input}
                        type="text"
                        name="apellido"
                        value={form.apellido}
                        onChange={handleInputChange}
                        placeholder="Apellido"
                        required
                    />
                    <input
                        className={styles.input}
                        type="date"
                        name="fecha_nacimiento"
                        value={form.fecha_nacimiento}
                        onChange={handleInputChange}
                        placeholder="Fecha de Nacimiento"
                        required
                        disabled={isEditing}
                    />
                    <input
                        className={styles.input}
                        type="email"
                        name="correo_electronico"
                        value={form.correo_electronico}
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