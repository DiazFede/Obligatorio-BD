{/* Componente que devuelve una tarjeta con el texto pasado por parámetro (children) */}

import React from 'react';
import Styles from './index.module.css'

const Card = ({ children }) => {
    return (
        <div className = {Styles.Card}>
            {children}
        </div>
    )
}

export default Card