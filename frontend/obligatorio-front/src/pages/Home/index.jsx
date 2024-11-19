import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import Header from '../../components/Header';
import Modal from '../../components/Modal';
import CardHome from '../../components/CardHome';
import { createClase, getInstructores } from '../../apiservices/api';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    deporte: '',
    fecha: '',
    turno: '',
    tipo: '',
    instructor: '',
  });
  const [instructores, setInstructores] = useState([]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setFormData({ deporte: '', fecha: '', turno: '', tipo: '', instructor: '' });
    setIsModalOpen(false);
  };

  useEffect(() => {
    // Cargar instructores al montar el componente
    const fetchInstructores = async () => {
      try {
        const data = await getInstructores();
        setInstructores(data);
      } catch (error) {
        console.error('Error al cargar instructores:', error);
      }
    };
    fetchInstructores();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createClase(formData);
      alert('Clase creada exitosamente');
      closeModal();
    } catch (error) {
      console.error('Error al crear la clase:', error);
      alert('Hubo un problema al crear la clase. Intenta de nuevo.');
    }
  };

  return (
    <>
      <Header openModal={openModal} />
      <div className={styles.mainContent}>
        {/* Tarjetas de deportes */}
        <div className={styles.cardContainer}>
          <CardHome title="Snowboard" content="Disfruta de la adrenalina en la nieve aprendiendo Snowboard en nuestras clases especializadas." />
          <CardHome title="Ski" content="Domina las pistas con nuestras clases de Ski para todos los niveles de experiencia." />
          <CardHome title="Moto de nieve" content="Explora el invierno de una forma diferente y emocionante con clases de manejo de moto de nieve." />
        </div>

        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Nueva clase</h2>
          <form onSubmit={handleSubmit}>
            <label>Deporte:
              <select name="deporte" value={formData.deporte} onChange={handleInputChange} required>
                <option value="">Seleccionar deporte</option>
                <option value="snowboard">Snowboard</option>
                <option value="ski">Ski</option>
                <option value="moto-nieve">Moto de nieve</option>
              </select>
            </label>
            <label>Fecha de la clase:
              <input type="date" name="fecha" value={formData.fecha} onChange={handleInputChange} required />
            </label>
            <label>Turno:
              <select name="turno" value={formData.turno} onChange={handleInputChange} required>
                <option value="">Seleccionar turno</option>
                <option value="9-11">9:00 - 11:00</option>
                <option value="12-14">12:00 - 14:00</option>
                <option value="16-18">16:00 - 18:00</option>
              </select>
            </label>
            <label>Tipo de clase:
              <select name="tipo" value={formData.tipo} onChange={handleInputChange} required>
                <option value="">Seleccionar tipo</option>
                <option value="individual">Individual</option>
                <option value="grupal">Grupal</option>
              </select>
            </label>
            <label>Instructor:
              <select name="instructor" value={formData.instructor} onChange={handleInputChange} required>
                <option value="">Seleccionar instructor</option>
                {instructores.map((instructor) => (
                  <option key={instructor.ci} value={instructor.ci}>
                    {instructor.nombre}
                  </option>
                ))}
              </select>
            </label>
            <button type="submit">Confirmar inscripción</button>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default Home;