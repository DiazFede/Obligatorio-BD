import React from 'react';
import Styles from './index.module.css';

const Card = ({ title, content }) => {
    return (
        <div className={Styles.Card}>
            <h3 className={Styles.title}>{title}</h3>
            <p className={Styles.content}>{content}</p>
        </div>
    );
}

export default Card;