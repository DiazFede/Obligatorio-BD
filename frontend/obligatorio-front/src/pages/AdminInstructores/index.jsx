import React, { useEffect, useState } from "react";
import { getInstructores, createInstructor, updateInstructor, deleteInstructor } from "../../apiservices/api";
import HeaderAdmin from "../../components/HeaderAdmin";
import CardAdmin from "../../components/CardAdmin";
import styles from './index.module.css';

const AdminInstructores = () => {
    const [instructores, setInstructores] = useState([]);
    const [form, setForm] = useState({ nombre: "", apellido: "", ci: "", disponibilidad: "", experiencia: "" });
    const [isEditing, setIsEditing] = useState(false);
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    useEffect(() => {
        loadInstructores();
    }, []);

    const loadInstructores = async () => {
        try {
            const data = await getInstructores();
            setInstructores(data);
        } catch (error) {
            console.error("Error al obtener instructores:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditing) {
            await updateInstructor(selectedInstructor.ci, form);
        } else {
            await createInstructor(form);
        }
        loadInstructores();
        setForm({ nombre: "", apellido: "", ci: "", disponibilidad: "", experiencia: "" });
        setIsEditing(false);
        setSelectedInstructor(null);
    };

    const handleEdit = (instructor) => {
        setForm(instructor);
        setIsEditing(true);
        setSelectedInstructor(instructor);
    };

    const handleDelete = async (ci) => {
        await deleteInstructor(ci);
        loadInstructores();
    };

    return (
        <>
            <HeaderAdmin />
            <div className={styles.cardContainer}>
                {instructores.map((instructor) => (
                    <CardAdmin
                        key={instructor.ci}
                        title={instructor.nombre + " " + instructor.apellido}
                        content={
                            <>
                                <p>Cédula: {instructor.ci}</p>
                                <p>Disponibilidad: {instructor.disponibilidad}</p>
                                <p>Experiencia: {instructor.experiencia}</p>
                                <button onClick={() => handleEdit(instructor)} className={styles.editButton}>Editar</button>
                                <button onClick={() => handleDelete(instructor.ci)} className={styles.deleteButton}>Eliminar</button>
                            </>
                        }
                    />
                ))}
            </div>

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
                    type="text"
                    name="ci"
                    value={form.ci}
                    onChange={handleInputChange}
                    placeholder="CI"
                    required
                    disabled={isEditing}
                />
                <input
                    type="text"
                    name="disponibilidad"
                    value={form.disponibilidad}
                    onChange={handleInputChange}
                    placeholder="Disponibilidad"
                    required
                />
                <input
                    type="text"
                    name="experiencia"
                    value={form.experiencia}
                    onChange={handleInputChange}
                    placeholder="Experiencia"
                    required
                />
                <button type="submit" className={styles.button}>{isEditing ? "Actualizar" : "Agregar"}</button>
            </form>
        </>
    );
};

export default AdminInstructores;