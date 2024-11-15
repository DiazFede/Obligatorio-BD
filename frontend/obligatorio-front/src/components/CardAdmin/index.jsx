import React from 'react';
import Styles from './index.module.css';

const CardAdmin = ({ title, content }) => {
    return (
        <div className={Styles.Card}>
            <h3 className={Styles.title}>{title}</h3>
            <div className={Styles.content}>{content}</div>
        </div>
    );
}

export default CardAdmin;