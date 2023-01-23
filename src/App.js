import React, { useState, useEffect } from 'react';

import MovieCard from './MovieCard';

// d225f5a9

import './App.css';
import SearchIcon from './search.svg'
const API_URL = "http://www.omdbapi.com?apikey=d225f5a9";

const movie1 = {
    "Title": "Transformers: Interstellar",
    "Year": "2014–2015",
    "imdbID": "tt6046050",
    "Type": "series",
    "Poster": "https://m.media-amazon.com/images/M/MV5BMGYxMmM0ZWUtMzViMS00YzUxLTllZjEtYzI2YzAzYjlkMWY4XkEyXkFqcGdeQXVyNTY3NjQzNjM@._V1_SX300.jpg"
}

const App = () => {

    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`)
        const data = await response.json();

        setMovies(data.Search);
    }

    useEffect(() => {

        searchMovies('Interstellar');

    }, [])

    return (
        <div className='app'>
            <h1>MovieLand</h1>
            <div className='search'>
                <input type="text" placeholder='Search for movies' value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value)}} />
                <img src={SearchIcon} alt="Search" onClick={() => searchMovies(searchTerm)} />
            </div>

            {
                movies?.length > 0
                    ? (
                        <div className='container'>
                            {
                                movies.map((movie) => (
                                    <MovieCard movie={movie} />
                                ))
                            }
                        </div>
                    ) : (
                        <div className='empty'>
                            <h2>No movies found</h2>
                        </div>
                    )
            }

        </div>
    );
}

export default App;