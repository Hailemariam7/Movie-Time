import React, { useContext, useEffect, useState } from "react"
import { WatchlistContext } from "../context/WatchlistContext"
import "./WatchList.scss" // Import the SCSS file

function Watchlist() {
  const { watchlist } = useContext(WatchlistContext)
  const [watchlistMovies, setWatchlistMovies] = useState([])
  const [savedWatchlist, setSavedWatchlist] = useState(watchlist)
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist))
    setSavedWatchlist(JSON.parse(localStorage.getItem("watchlist")))
  }, [watchlist])

  useEffect(() => {
    const fetchWatchlistMovies = async () => {
      try {
        const movies = await Promise.all(
          savedWatchlist.map(async (id) => {
            const response = await fetch(
              `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
            )
            const movie = await response.json()
            return movie
          })
        )
        setWatchlistMovies(movies)
      } catch (error) {
        console.error("Error fetching watchlist movies:", error)
      }
    }

    if (watchlist.length > 0) {
      fetchWatchlistMovies()
    }
  }, [savedWatchlist])

  return (
    <div className='watchlist-container'>
      <div className='movies-grid'>
        {watchlistMovies.length > 0 ? (
          watchlistMovies.map((movie) => (
            <div key={movie.id} className='movie-card'>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </div>
          ))
        ) : (
          <p className='no-movies-message'>No movies in your watchlist.</p>
        )}
      </div>
    </div>
  )
}

export default Watchlist
