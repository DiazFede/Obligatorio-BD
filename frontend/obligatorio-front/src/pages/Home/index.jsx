import React, { useState } from 'react';
import styles from './index.module.css';
import Header from '../../components/Header';
import Modal from '../../components/Modal';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <Header openModal={openModal} />
      <div className={styles.mainContent}>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <h2>Nueva clase</h2>
          <form>
            <label>Deporte:
              <select required>
                <option value="">Seleccionar deporte</option>
                <option value="snowboard">Snowboard</option>
                <option value="ski">Ski</option>
                <option value="moto-nieve">Moto de nieve</option>
              </select>
            </label>

            <label>Fecha de la clase:
              <input type="date" required />
            </label>

            <label>Turno:
              <select required>
                <option value="">Seleccionar turno</option>
                <option value="9-11">9:00 - 11:00</option>
                <option value="12-14">12:00 - 14:00</option>
                <option value="16-18">16:00 - 18:00</option>
              </select>
            </label>

            <label>Tipo de clase:
              <select required>
                <option value="">Seleccionar tipo</option>
                <option value="individual">Individual</option>
                <option value="grupal">Grupal</option>
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