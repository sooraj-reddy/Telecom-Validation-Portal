import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './CSVWindow.module.css';

const CSVWindow = () => {
  const { type } = useParams(); // Get the type ('mcq' or 'descriptive') from the URL
  const [csvData, setCsvData] = useState([]); // Use an empty array instead of null
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null);     // To track any errors

  useEffect(() => {
    // Fetch the appropriate CSV file based on the type
    fetch(`/csv/${type}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response as JSON
      })
      .then((data) => {
        setCsvData(data); // Store parsed CSV data
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [type]);

  if (loading) {
    return <p>Loading CSV data...</p>;
  }

  if (error) {
    return <p>Error loading CSV data: {error}</p>;
  }

  return (
    <div className={styles.csvWindow}>
      {csvData.length > 0 ? (
        <table className={styles.csvTable}>
          <thead>
            <tr>
              {Object.keys(csvData[0]).map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {csvData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((value, colIndex) => (
                  <td key={colIndex}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No CSV data available</p>
      )}
    </div>
  );
};

export default CSVWindow;
