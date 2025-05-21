import React, { useState } from 'react';

function RatingForm({ initialRating = {}, onSubmit, onCancel }) {
  const [rating, setRating] = useState({
    score: initialRating.score || 5,
    comment: initialRating.comment || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(rating);
  };

  return (
    <div className="rating-form">
      <h3>Rate This Movie</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Score (1-10):</label>
          <input
            type="number"
            min="1"
            max="10"
            value={rating.score}
            onChange={(e) => setRating({...rating, score: Number(e.target.value)})}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Comments:</label>
          <textarea
            value={rating.comment}
            onChange={(e) => setRating({...rating, comment: e.target.value})}
            rows="4"
          />
        </div>
        
        <div className="form-actions">
          <button type="submit">Save Rating</button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default RatingForm;