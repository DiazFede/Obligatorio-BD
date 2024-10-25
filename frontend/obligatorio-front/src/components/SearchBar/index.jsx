{/* Componente que devuelve una barra de búsqueda. El texto mostrado se ve afectado por el placeholder */}

import React from 'react';
import styles from './index.module.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Buscar turnos..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;