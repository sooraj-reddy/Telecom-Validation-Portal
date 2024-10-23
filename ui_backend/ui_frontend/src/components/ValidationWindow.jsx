import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ValidationWindow.module.css';
import { UserContext } from './UserContext.jsx';

const ValidationWindow = () => {
  const { type } = useParams(); // Capture "mcq" or other types from the route
  const [questions, setQuestions] = useState([]);
  const { currentUser } = useContext(UserContext);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({}); // Track selected options for each question

  useEffect(() => {
    // Fetch CSV data based on type
    fetch(`http://localhost:5001/csv/${type}`)
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [type]);

  const handleSave = () => {
    const saveData = {
      username: currentUser, // Actual logged-in username from context
      questionId: currentQuestionIndex + 1, // 1-based index
      fileType: type, // "mcq" or other types
      response: selectedOptions[currentQuestionIndex], // Get selected option for the current question
    };

    fetch('http://localhost:5001/saveResponse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(saveData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Save response:', data);
        alert('Your response was saved! Thanks for your contribution.');
        // Handle success (e.g., show a message to the user)
      })
      .catch((error) => {
        console.error('Error saving response:', error);
        alert('Failed to save your response.'); 
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

  const currentQuestion = questions[currentQuestionIndex];

  // Function to render MCQ question
  const renderMCQ = () => (
    <div className={styles.options}>
      <p><strong>Option 1:</strong> {currentQuestion['Option 1']}</p>
      <p><strong>Option 2:</strong> {currentQuestion['Option 2']}</p>
      <p><strong>Option 3:</strong> {currentQuestion['Option 3']}</p>
      <p><strong>Option 4:</strong> {currentQuestion['Option 4']}</p>
      <p><strong>Answer:</strong> {currentQuestion.Answer}</p>
      <p><strong>Explanation:</strong> {currentQuestion.Explanation}</p>
      <p><strong>Source:</strong> {currentQuestion.Source}</p>
      <p><strong>Section:</strong> {currentQuestion.Section}</p>
      <p><strong>Working Group:</strong> {currentQuestion['Working Group']}</p>
      <p><strong>Series:</strong> {currentQuestion.Series}</p>
    </div>
  );

  // Function to render Descriptive question
  const renderDescriptive = () => (
    <div className={styles.options}>
      <p><strong>Candidate Answer 1:</strong> {currentQuestion['Candidate Answer 1']}</p>
      <p><strong>Candidate Answer 2:</strong> {currentQuestion['Candidate Answer 2']}</p>
      <p><strong>Candidate Answer 3:</strong> {currentQuestion['Candidate Answer 3']}</p>
      <p><strong>Source:</strong> {currentQuestion.Source}</p>
      <p><strong>Section:</strong> {currentQuestion.Section}</p>
      <p><strong>Working Group:</strong> {currentQuestion['Working Group']}</p>
      <p><strong>Series:</strong> {currentQuestion.Series}</p>
    </div>
  );

  // Function to render opinion options based on question type
  const renderOpinionOptions = () => {
    let opinionOptions = [];

    switch (type) {
      case 'mcq':
        opinionOptions = ['Question generated is irrelevant to its corresponding metadata', 'The proposed answer and explantion are wrong', 'The proposed answer is correct but its corresponding explanation is wrong', 'All the options are very different from each other and the propsed answer and its explanation are correct', 'All the options are very close to each other and the propsed answer and its corresponding explanation are correct'];
        break;
      case 'descriptive':
        opinionOptions = ['Question generated is irrelevant to its corresponding metadata', 'Candidate Answer 1 is the best match', 'Candidate Answer 2 is the best match', 'Candidate Answer 3 is the best match', 'All the answers are irrelevant to the generated question'];
        break;
      // Add more cases for additional types
      // case 'type3':
      //   opinionOptions = ['Option A', 'Option B', 'Option C'];
      //   break;
      // case 'type4':
      //   opinionOptions = ['Correct', 'Incorrect'];
      //   break;
      // default:
      //   opinionOptions = [];
      //   break;
    }

    return (
      <div className={styles.opinionSection}>
        <h4>What do you feel about this question?</h4>
        {opinionOptions.map((option, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`opinion-${index}`}
              name="opinion"
              value={option}
              checked={selectedOptions[currentQuestionIndex] === option}
              onChange={handleOptionChange}
            />
            <label htmlFor={`opinion-${index}`}>{option}</label>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={styles.validationWindow}>
      <h2>Validation - {type.toUpperCase()} </h2>
      <div className={styles.questionCard}>
        <h3>{currentQuestionIndex + 1}. Question: {currentQuestion.Question}</h3>
        {type === 'mcq' && renderMCQ()}
        {type === 'descriptive' && renderDescriptive()}
        {/* Add more conditions for additional types */}
        {/* You can call the relevant render functions for the other types as needed */}
        {renderOpinionOptions()}
      </div>

      <div className={styles.navigation}>
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>
        <button onClick={handleSave}>Save</button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ValidationWindow;
