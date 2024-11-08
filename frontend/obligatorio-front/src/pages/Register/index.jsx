import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import HeaderLogin from '../../components/HeaderLogin';
import { createAlumno } from '../../apiservices/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cedula: '',
    nombre: '',
    apellido: '',
    email: '',
    fechaNacimiento: '',
    telefono: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Transformación del objeto formData para que coincida con los campos esperados por el backend
    const alumnoData = {
      ci: formData.cedula,
      nombre: formData.nombre,
      apellido: formData.apellido,
      correo: formData.email,
      telefono: formData.telefono,
      contrasena: formData.password,
    };

    // Convertir fechaNacimiento al formato DD-MM-YYYY
    if (formData.fechaNacimiento) {
      const date = new Date(formData.fechaNacimiento);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      alumnoData.fecha_nacimiento = `${day}-${month}-${year}`;
    }

    try {
      await createAlumno(alumnoData);
      navigate('/home'); // Redirige a Home después del registro exitoso
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  return (
    <>
      <HeaderLogin />
      <div className={styles.registerForm}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label}>Cédula de identidad</label>
          <input
            type="text"
            name="cedula"
            placeholder="Cédula de identidad"
            value={formData.cedula}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Nombre</label>
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Apellido</label>
          <input
            type="text"
            name="apellido"
            placeholder="Apellido"
            value={formData.apellido}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Correo electrónico</label>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Fecha de nacimiento</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Teléfono</label>
          <input
            type="tel"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className={styles.input}
          />
          <label className={styles.label}>Contraseña</label>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            Registrar
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
