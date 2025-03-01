import React from 'react';
import './Feedback.css';

const Feedback = ({ isCorrect }) => {
  return (
    <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
      {isCorrect ? (
        <div>
          <h2>🎉 Correct Answer!</h2>
          <p>Here's a fun fact:</p>
        </div>
      ) : (
        <div>
          <h2>😢 Incorrect Answer</h2>
          <p>Here's a fun fact:</p>
        </div>
      )}
    </div>
  );
};

export default Feedback;