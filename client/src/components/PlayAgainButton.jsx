import React from 'react';
import './PlayAgainButton.css';

const PlayAgainButton = ({ onClick }) => {
  return (
    <button className="play-again-button" onClick={onClick}>
      Play Again
    </button>
  );
};

export default PlayAgainButton;