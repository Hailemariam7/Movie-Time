import React, { useState, useEffect } from "react"
import useFetch from "./useFetch"

const MoviesList = ({ searchTerm }) => {
  const [popularMovies, setPopularMovies] = useState([])
  const { movies, loading, error } = useFetch(searchTerm)

  useEffect(() => {
    async function fetchPopularMovies() {
      const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`

      try {
        const response = await fetch(url)
        const data = await response.json()
        setPopularMovies(data.results)
      } catch (error) {
        console.error("Error fetching popular movies:", error)
      }
    }

    fetchPopularMovies()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching movies: {error.message}</p>

  const displayMovies = searchTerm ? movies : popularMovies
  const title = searchTerm
    ? "Search result for " + searchTerm
    : "Trending movies"

  return (
    <div className='movies-list'>
      <h2>{title}</h2>
      {displayMovies.map((movie) => (
        <div key={movie.id} className='movie-card'>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
          <p>{movie.overview}</p>
        </div>
      ))}
    </div>
  )
}

export default MoviesList
