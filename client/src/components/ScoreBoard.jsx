import React from 'react';
import './ScoreBoard.css';

const ScoreBoard = ({ score }) => {
  return (
    <div className="score-board">
      <h2>Score</h2>
      <p>Correct: {score.correct}</p>
      <p>Incorrect: {score.incorrect}</p>
    </div>
  );
};

export default ScoreBoard;