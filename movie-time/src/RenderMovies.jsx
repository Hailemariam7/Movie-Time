import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { WatchlistContext } from "./WatchlistContext"
import useFetch from "./useFetch"
//import lightIcon from "./assets/lightWatchListIcon.png"
//import darkIcon from "./assets/darkWatchListIcon.png"

export function RenderMovies({ title, url, reset }) {
  const { watchlist, toggleWatchlist } = useContext(WatchlistContext)

  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const { data, loading: fetchLoading, error: fetchError } = useFetch(url)

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
      <h2>{title}</h2>
      <div className='movies-grid'>
        {movies.map((movie) => (
          <div
            key={movie.id}
            className='movie-card'
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={
                watchlist.includes(movie.id)
                  ? "./assets/darkWatchListIcon.png"
                  : "./assets/lightWatchListIcon.png"
              }
              alt={
                watchlist.includes(movie.id)
                  ? "Remove from watchlist"
                  : "Add to watchlist"
              }
              onClick={(e) => {
                toggleWatchlist(movie.id)
                e.stopPropagation()
              }}
              style={{ cursor: "pointer" }}
            />
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
            <h3>{movie.title}</h3>
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
