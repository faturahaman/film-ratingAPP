import React from 'react';
import MovieCard from './MovieCard';

function MovieList({ movies, onSelectMovie }) {
  if (!movies || movies.length === 0) {
    return <div className="no-results">No movies found. Try searching for something!</div>;
  }

  return (
    <div className="movie-list">
      {movies.map(movie => (
        <MovieCard 
          key={movie.imdbID} 
          movie={movie} 
          onClick={() => onSelectMovie(movie.imdbID)} 
        />
      ))}
    </div>
  );
}

export default MovieList;