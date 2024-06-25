import React, { useEffect, useState, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom"
import useFetch from "./useFetch"
import { WatchlistContext } from "./WatchlistContext"

const GenreMovies = () => {
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext)
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
            <button
              onClick={(e) => {
                toggleWatchlist(movie.id)
                e.stopPropagation()
              }}
              style={{
                backgroundColor: watchlist.includes(movie.id) ? "red" : "green",
              }}
              className='watchlist-button'
            >
              {watchlist.includes(movie.id)
                ? "Remove from watchlist"
                : "Add to watchlist"}
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleMoreClick} className='more-button'>
        More
      </button>
    </div>
  )
}

export default GenreMovies
