import React from 'react';
import { useNavigate } from 'react-router-dom';
import Styles from './DatasetSelection.module.css'; 

const DatasetSelection = () => {
  const navigate = useNavigate();

  const handleCardClick = (dataset) => {
    if (dataset === 'mcq') {
      navigate(`/validate/${dataset}`);
    } else if (dataset === 'descriptive') {
      navigate(`/validate/${dataset}`);
    }
  };

  return (
    <div className={Styles.container}>
      <h2>Select Dataset to Validate</h2>
      <div className={Styles.cardContainer}>
        <div className={Styles.card} onClick={() => handleCardClick('mcq')}>
          <div className={Styles.datasetTitle}>MCQ Dataset</div>
        </div>
        <div className={Styles.card} onClick={() => handleCardClick('descriptive')}>
          <div className={Styles.datasetTitle}>Descriptive Dataset</div>
        </div>
        {/* <div className={Styles.card} onClick={() => alert('Dataset not implemented yet')}>
          <div className={Styles.datasetTitle}>Dataset 3</div>
        </div>
        <div className={Styles.card} onClick={() => alert('Dataset not implemented yet')}>
          <div className={Styles.datasetTitle}>Dataset 4</div>
        </div> */}
      </div>
    </div>
  );
};

export default DatasetSelection;
