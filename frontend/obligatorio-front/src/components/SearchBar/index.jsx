import React from 'react';
import styles from './index.module.css';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      className={styles.searchInput}
      placeholder="Buscar alumnos..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export default SearchBar;