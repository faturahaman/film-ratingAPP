import React from 'react';

function MovieCard({ movie, onClick }) {
  const posterUrl = movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png";

  return (
    <div className="movie-card" onClick={onClick}>
      <div className="movie-poster">
        <img src={posterUrl} alt={movie.Title} />
      </div>
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}

export default MovieCard;