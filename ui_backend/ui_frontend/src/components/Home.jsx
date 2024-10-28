import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card'; 
import styles from './Home.module.css';

const Home = () => {
  const navigate = useNavigate();

  const handleCardClick = (type) => {
    navigate(`/csv/${type}`);
  };

  return (
    <div className={styles.home}>
      <div className={styles.heading}>
        <h2>Telecom Datasets</h2>
      </div>

      <Card 
        title="MCQ Questions" 
        onClick={() => handleCardClick('mcq')} 
      />
      
      <Card 
        title="Descriptive Questions" 
        onClick={() => handleCardClick('descriptive')} 
      />

      <Card 
        title="Named Entity Recognition" 
        onClick={() => handleCardClick('ner')} 
      />
      
    </div>
  );
};

export default Home;
