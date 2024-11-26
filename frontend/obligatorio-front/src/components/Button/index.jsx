import React from 'react';
import Styles from './index.module.css'

const Button = ({ children , onClick }) => {
    return (
        <button onClick = {onClick} className = {Styles.button}>{children}</button>
    )
}

export default Button