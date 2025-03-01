import React from 'react';
import './ClueCard.css';

const ClueCard = ({ clue }) => {
  return (
    <div className="clue-card">
      <h2>Clue</h2>
      <p>{clue}</p>
    </div>
  );
};

export default ClueCard;