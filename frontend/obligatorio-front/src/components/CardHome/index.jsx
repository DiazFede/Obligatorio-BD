import React from 'react';
import Styles from './index.module.css';
import Button from '../Button';

const CardHome = ({ title, content }) => {
    return (
        <div className={Styles.Card}>
            <h3 className={Styles.title}>{title}</h3>
            <p className={Styles.content}>{content}</p>
            <Button>Saber mas</Button>
        </div>
    );
}

export default CardHome;