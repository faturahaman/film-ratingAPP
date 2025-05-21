import React, { useState } from 'react';
import RatingForm from './RatingForm';

function MovieDetail({ movie, onBack, onAddRating, userRating }) {
  const [showRatingForm, setShowRatingForm] = useState(false);

  const handleAddRating = (rating) => {
    const newRating = {
      imdbID: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      year: movie.Year,
      score: rating.score,
      comment: rating.comment,
      date: new Date().toISOString()
    };
    
    // Add ID only for updates
    if (userRating && userRating.id) {
      newRating.id = userRating.id;
    }
    
    onAddRating(newRating);
    setShowRatingForm(false);
  };

  return (
    <div className="movie-detail">
      <button className="back-button" onClick={onBack}>← Back to Search</button>
      
      <div className="movie-detail-content">
        <div className="movie-poster">
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"} 
            alt={movie.Title} 
          />
        </div>
        
        <div className="movie-info">
          <h2>{movie.Title} ({movie.Year})</h2>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Cast:</strong> {movie.Actors}</p>
          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}/10</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          
          {userRating && (
            <div className="user-rating">
              <h3>Your Rating: {userRating.score}/10</h3>
              <p>{userRating.comment}</p>
              <button onClick={() => setShowRatingForm(true)}>Edit Rating</button>
            </div>
          )}
          
          {!userRating && (
            <button 
              className="rate-button" 
              onClick={() => setShowRatingForm(true)}
            >
              Rate This Movie
            </button>
          )}
          
          {showRatingForm && (
            <RatingForm 
              initialRating={userRating || {}}
              onSubmit={handleAddRating}
              onCancel={() => setShowRatingForm(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;