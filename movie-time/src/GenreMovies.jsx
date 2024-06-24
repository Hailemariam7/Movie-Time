import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useFetch from "./useFetch"

const GenreMovies = () => {
  const [page, setPage] = useState(1)
  const [url, setUrl] = useState("")
  const { genreId } = useParams()
  const navigate = useNavigate()
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"

  useEffect(() => {
    setUrl(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`
    )
  }, [page])

  const handleMoreClick = () => {
    setPage((prevPage) => prevPage + 1)
  }

  const { data: movies, loading, error } = useFetch(url)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching movies: {error.message}</p>
  if (!movies) return null

  return (
    <div className='movies-list'>
      <h2>Movies</h2>
      <div className='movies-grid'>
        {movies.results.map((movie) => (
          <div
            key={movie.id}
            className='movie-card'
            onClick={() => navigate(`/movie/${movie.id}`)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
          </div>
        ))}
        <button onClick={handleMoreClick}>More</button>
      </div>
    </div>
  )
}

export default GenreMovies
