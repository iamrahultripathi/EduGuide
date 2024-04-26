import React from 'react';
import './PredictionPage.css'

const PredictionPage= ({ prediction })=> {
  // Parse the prediction string into an array
  const universities = JSON.parse(prediction);

  // Check if universities is an array
  if (!Array.isArray(universities) || !universities.length) {
    return <p>No universities predicted.</p>;
  }

  return (
    <div className="prediction-page">
      <h2>List of Predicted Universities:</h2>
      <ol className="universities-list">
        {universities.map((university, index) => (
          <li key={index}>{university}</li>
        ))}
      </ol>
    </div>
  );
}

export default PredictionPage;
