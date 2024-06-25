import React, { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { WatchlistContext } from "./WatchlistContext"
import useFetch from "./useFetch"

export function RenderMovies({ title, url, reset }) {
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const { data, loading: fetchLoading, error: fetchError } = useFetch(url)

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
  }, [watchlist])

  useEffect(() => {
    if (fetchError) {
      setError(fetchError)
      setLoading(false)
    } else if (!fetchLoading && data) {
      if (reset) {
        setMovies(data.results)
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data.results])
      }
      setLoading(false)
    }
  }, [data, fetchLoading, fetchError])

  function handleMovieClick(id) {
    navigate(`/movie/${id}`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching movies: {error.message}</p>
  if (!movies.length) return null

  return (
    <div className='movies-list'>
      <div className='movies-grid'>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='movie-card'
            onClick={() => handleMovieClick(movie.id)}
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
                localStorage.setItem("watchlist", watchlist)
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
    </div>
  )
}
