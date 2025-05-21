import React, { useState, useEffect } from 'react';
import SearchBar from './components/Searchbar';
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';
import RatingList from './components/RatingList';
import { fetchRatings, createRating, updateRatingAPI, deleteRatingAPI } from './utils/api';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState('search');
  const OMDB_API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  useEffect(() => {
    const loadRatings = async () => {
      setLoading(true);
      try {
        const data = await fetchRatings();
        setRatings(data);
      } catch (err) {
        setError('Error loading ratings');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadRatings();
  }, []);

 const searchMovies = async (query) => {
  if (!query) return;

  setLoading(true);
  setError('');
  try {
    const response = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        s: query,
        apikey: OMDB_API_KEY,
      },
    });
    const data = response.data;

    if (data.Response === 'True') {
      setMovies(data.Search);
    } else {
      setError(data.Error);
      setMovies([]);
    }
  } catch (err) {
    setError('Error fetching movies');
    console.error(err);
  } finally {
    setLoading(false);
  }
};

const getMovieDetails = async (imdbID) => {
  setLoading(true);
  try {
    const response = await axios.get(`https://www.omdbapi.com/`, {
      params: {
        i: imdbID,
        apikey: OMDB_API_KEY,
      },
    });
    const data = response.data;

    if (data.Response === 'True') {
      setSelectedMovie(data);
      setView('detail');
    } else {
      setError(data.Error);
    }
  } catch (err) {
    setError('Error fetching movie details');
    console.error(err);
  } finally {
    setLoading(false);
  }
};


 
  const addRating = async (rating) => {
    try {
      setLoading(true);
      

      const existingRating = ratings.find(r => r.imdbID === rating.imdbID);
      
      if (existingRating) {
        const updatedRating = await updateRatingAPI(existingRating.id, {
          ...rating,
          id: existingRating.id
        });
        setRatings(ratings.map(r => r.id === updatedRating.id ? updatedRating : r));
      } else {
  
        const newRating = await createRating(rating);
        setRatings([...ratings, newRating]);
      }
    } catch (err) {
      setError('Error saving rating');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateRating = async (updatedRating) => {
    try {
      setLoading(true);
      const result = await updateRatingAPI(updatedRating.id, updatedRating);
      setRatings(ratings.map(rating => 
        rating.id === result.id ? result : rating
      ));
    } catch (err) {
      setError('Error updating rating');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteRating = async (id) => {
    try {
      setLoading(true);
      await deleteRatingAPI(id);
      setRatings(ratings.filter(rating => rating.id !== id));
    } catch (err) {
      setError('Error deleting rating');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const navigateTo = (view) => {
    setView(view);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Movie Rating App</h1>
        <nav>
          <button onClick={() => navigateTo('search')}>Search Movies</button>
          <button onClick={() => navigateTo('ratings')}>My Ratings</button>
        </nav>
      </header>
      
      <main className="app-main">
        {view === 'search' && (
          <>
            <SearchBar onSearch={searchMovies} />
            
            {loading && <div className="loading">Loading...</div>}
            {error && <div className="error">{error}</div>}
            
            <MovieList 
              movies={movies} 
              onSelectMovie={getMovieDetails} 
            />
          </>
        )}
        
        {view === 'detail' && selectedMovie && (
          <MovieDetail 
            movie={selectedMovie}
            onBack={() => navigateTo('search')}
            onAddRating={addRating}
            userRating={ratings.find(r => r.imdbID === selectedMovie.imdbID)}
          />
        )}
        
        {view === 'ratings' && (
          <RatingList 
            ratings={ratings}
            onUpdateRating={updateRating}
            onDeleteRating={deleteRating}
            onSelectMovie={getMovieDetails}
          />
        )}
      </main>
    </div>
  );
}

export default App;