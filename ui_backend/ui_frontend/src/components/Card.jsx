import React from 'react';
import styles from './Card.module.css';

const Card = ({ title, onClick }) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <h3>{title}</h3>
    </div>
  );
};

export default Card;
