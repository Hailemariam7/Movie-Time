//import "dotenv/config"
import { useNavigate } from "react-router-dom"
import useFetch from "./useFetch"

const MoviesList = ({ searchTerm }) => {
  const navigate = useNavigate()
  //const API_KEY = process.env.REACT_APP_API_KEY
  const API_KEY = "fe4e1083c94c0926ccbca5cdc54bdeab"
  const trendingUrl = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
  const searchTermUrl = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchTerm}`

  const url = searchTerm ? searchTermUrl : trendingUrl

  const { data: movies, loading, error } = useFetch(url)

  function handleMovieClick(id) {
    navigate(`/movie/${id}`)
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error fetching movies: {error.message}</p>
  if (!movies) return null

  const title = searchTerm
    ? `Search result for "${searchTerm}"`
    : "Trending Movies"

  return (
    <div className='movies-list'>
      <h2>{title}</h2>
      <div className='movies-grid'>
        {movies.results.map((movie) => (
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
            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MoviesList
