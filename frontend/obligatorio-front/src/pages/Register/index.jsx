import React, { useState } from 'react';
import styles from './index.module.css';

const Register = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos de registro:', formData);
  };

  return (
    <div className={styles.registerForm}>
      <h2 className={styles.title}>Registro de Usuario</h2>
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
  );
};

export default Register;