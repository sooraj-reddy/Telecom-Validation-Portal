import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DescriptiveValidationWindow.module.css';
import { UserContext } from './UserContext.jsx'; 

const DescriptiveValidationWindow = () => {
  const { type } = useParams(); // to capture "mcq" or "descriptive" from the route
  const [questions, setQuestions] = useState([]);
  const { currentUser } = useContext(UserContext); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // To track the selected option for each question

  useEffect(() => {
    // Fetch CSV data based on type (mcq or descriptive)
    fetch(`/csv/${type}`)
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching data:', error));
  }, [type]);

  const handleSave = () => {
     const saveData = {
       username: currentUser, // Replace this with the actual logged-in username, possibly from state or context
       questionId: currentQuestionIndex + 1, // 1-based index
       fileType: type, // "mcq" or "descriptive"
       response: selectedOptions[currentQuestionIndex], // Get the selected option for the current question
     };
   
     fetch('/saveResponse', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(saveData), // Ensure data is serialized properly
     })
       .then((response) => response.json())
       .then((data) => {
         console.log('Save response:', data);
         // Handle success, show message to user
       })
       .catch((error) => {
         console.error('Error saving response:', error);
         // Handle error
       });
   };
   
  if (questions.length === 0) {
    return <div>Loading questions...</div>;
  }

  // Handles option selection
  const handleOptionChange = (e) => {
    const { value } = e.target;
    setSelectedOptions({
      ...selectedOptions,
      [currentQuestionIndex]: value,
    });
  };

  const handleNext = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex < questions.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const {
    Question,
    'Candidate Answer 1': candidateAnswer1,
    'Candidate Answer 2': candidateAnswer2,
    'Candidate Answer 3': candidateAnswer3,
    Answer,
    Explanation,
    Source,
    Section,
    'Working Group': workingGroup,
    Series
  } = questions[currentQuestionIndex]; // Adjust based on CSV structure

  // Define the opinion options
  const opinionOptions = ['Answer 1 is best match', 'Answer 2 is best match', 'Answer 3 is best match', 'Question is wrong'];

  return (
    <div className={styles.validationWindow}>
      <h2>Validation - {type.toUpperCase()} Questions</h2>
      <div className={styles.questionCard}>
        <h3>{currentQuestionIndex+1}. Question: {Question}</h3>
        <div className={styles.options}>
          <p><strong>Candidate Answer 1:</strong> {candidateAnswer1}</p>
          <p><strong>Candidate Answer 2:</strong> {candidateAnswer2}</p>
          <p><strong>Candidate Answer 3:</strong> {candidateAnswer3}</p>
        </div>
        <p><strong>Source:</strong> {Source}</p>
        <p><strong>Section:</strong> {Section}</p>
        <p><strong>Working Group:</strong> {workingGroup}</p>
        <p><strong>Series:</strong> {Series}</p>
        
        {/* Opinion options */}
        <div className={styles.opinionSection}>
          <h4>How do you feel about this question?</h4>
          {opinionOptions.map((option, index) => (
            <div key={index}>
              <input
                type="radio"
                id={`opinion-${index}`}
                name="opinion"
                value={option}
                checked={selectedOptions[currentQuestionIndex] === option} // Retain selected option
                onChange={handleOptionChange} // Handle user selection
              />
              <label htmlFor={`opinion-${index}`}>{option}</label>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.navigation}>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleSave}>Save</button>
        <button
          onClick={handleNext}
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DescriptiveValidationWindow;
