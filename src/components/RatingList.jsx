import React, { useState } from 'react';
import RatingForm from './RatingForm';

function RatingList({ ratings, onUpdateRating, onDeleteRating, onSelectMovie }) {
  const [editingId, setEditingId] = useState(null);

  const handleUpdateRating = (updatedRating) => {
    const rating = ratings.find(r => r.id === editingId);
    const newRating = {
      ...rating,
      score: updatedRating.score,
      comment: updatedRating.comment,
      date: new Date().toISOString()
    };
    
    onUpdateRating(newRating);
    setEditingId(null);
  };

  if (ratings.length === 0) {
    return (
      <div className="ratings-empty">
        <h2>My Ratings</h2>
        <p>You haven't rated any movies yet. Search for movies to start rating!</p>
      </div>
    );
  }

  return (
    <div className="ratings-list">
      <h2>My Ratings</h2>
      
      {ratings.map(rating => (
        <div key={rating.id} className="rating-item">
          {editingId === rating.id ? (
            <RatingForm
              initialRating={rating}
              onSubmit={handleUpdateRating}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <div className="rating-content">
              <div className="rating-movie" onClick={() => onSelectMovie(rating.imdbID)}>
                <img 
                  src={rating.poster !== "N/A" ? rating.poster : "/placeholder.png"} 
                  alt={rating.title} 
                />
                <div>
                  <h3>{rating.title} ({rating.year})</h3>
                  <p>Your Rating: {rating.score}/10</p>
                </div>
              </div>
              
              <div className="rating-comment">
                <p>{rating.comment}</p>
                <p className="rating-date">
                  Rated on: {new Date(rating.date).toLocaleDateString()}
                </p>
              </div>
              
              <div className="rating-actions">
                <button onClick={() => setEditingId(rating.id)}>Edit</button>
                <button onClick={() => onDeleteRating(rating.id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default RatingList;